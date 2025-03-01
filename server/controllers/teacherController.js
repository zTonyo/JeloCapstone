require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const { sendConfirmationEmail } = require('../services/emailService')
const { findUserByEmail, addUser, confirmUser } = require('../models/userModel');
const { maskEmail } = require('../utils/maskedEmail');
const { query } = require('express');


exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    const query = "SELECT uc.user_id, uc.email, uc.password, uc.user_role, ui.profile_path FROM user_credential uc LEFT JOIN user_info ui ON uc.user_id = ui.user_id WHERE uc.email = ?";
    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        // Compare entered password with hashed password from database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        // ✅ Set HTTP-Only Cookie
        res.cookie("authToken", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false,  // Set to true in production (HTTPS)
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({ 
            message: "Login successful",
            profilePicture: user.profile_path
         });
    });
}

// First step in account registration for the Teachers, volunteer, and staff.
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    if (findUserByEmail(email)) {
        return res.status(400).send('User already exists');
    }
    // Generate a confirmation token
    const confirmationToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Save the user (in-memory storage for demonstration)
    addUser({ name, email, password, role, confirmationToken, confirmed: false });

    // Send confirmation email
    const confirmationLink = `${process.env.BASE_URL}api/teacher/confirm/${confirmationToken}`;
    try {
        await sendConfirmationEmail(email, confirmationLink);
        res.status(200).send('Registration successful. Please check your email to confirm your account.');
    } catch (error) {
        res.status(500).send('Error sending confirmation email');
    }
};

// For account confirmation
exports.userAccountConfirmation = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = confirmUser(decoded.email);

        if (user) {
            // console.log(user);
            try {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const sql = "INSERT INTO user_credential (email, password, user_role) VALUES (?, ?, ?)";
            
                db.query(sql, [user.email, hashedPassword, user.role], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Error creating user" });
                    }
            
                    const userId = result.insertId;
                    const secondSql = "INSERT INTO user_info (user_id, fullname) VALUES (?, ?)";
                    db.query(secondSql, [userId, user.name], (err, secondResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ message: "Error inserting user info" });
                        }            
                    });
                    return res.redirect(`${process.env.CLIENT_URL}token?confirmed=true`);
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Server error" });
            }
            // res.status(200).send('Email confirmed successfully!');
        } else {
            return res.redirect(`${process.env.CLIENT_URL}/login?error=invalid`);
        }
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).send(error.name === "TokenExpiredError" ? "Token expired." : "Invalid token.");
    }
}

exports.userLogout = (req, res) => {
    try {
        res.clearCookie("authToken");
        res.json({ message: "Logged out" });
    } catch  (error){
        res.status(500).json({ message: "something went wrong", error });
    }
};

// Get All Users
exports.getUsers = (req, res) => {
    const query = "SELECT uc.user_id, uc.user_role AS position, ui.fullname AS name, ui.address AS contact_number, uc.email FROM user_credential uc JOIN user_info ui ON uc.user_id = ui.user_id"

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error retrieving users" });
        }
        // Mask email before sending response
        const maskedResults = results.map(user => ({
            ...user,
            email: maskEmail(user.email) // ✅ Correct function usage
        }));

        res.json(maskedResults);
    });
};
