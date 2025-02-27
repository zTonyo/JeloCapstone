const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO user_credential (email, password, user_role) VALUES (?, ?, ?)";
    
        db.query(sql, [email, hashedPassword, role], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error creating user" });
            }
    
            const userId = result.insertId;
            const secondSql = "INSERT INTO user_info (user_id, fullname) VALUES (?, ?)";
            db.query(secondSql, [userId, name], (err, secondResult) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error inserting user info" });
                }
    
                res.status(201).json({ message: "User created successfully", userId });
            });
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Users
exports.getUsers = (req, res) => {
    db.query("SELECT * FROM user_credential", (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving users" });
        res.json(results);
    });
};
