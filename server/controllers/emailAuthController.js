const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../services/emailService');
const { findUserByEmail, addUser, confirmUser } = require('../models/userModel');

const register = async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    if (findUserByEmail(email)) {
        return res.status(400).send('User already exists');
    }

    // Generate a confirmation token
    const confirmationToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Save the user (in-memory storage for demonstration)
    addUser({ email, password, confirmationToken, confirmed: false });

    // Send confirmation email
    const confirmationLink = `http://localhost:3000/confirm?token=${confirmationToken}`;
    try {
        await sendConfirmationEmail(email, confirmationLink);
        res.status(200).send('Registration successful. Please check your email to confirm your account.');
    } catch (error) {
        res.status(500).send('Error sending confirmation email');
    }
};

const registrationConfirmation = (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = confirmUser(decoded.email);

        if (user) {
            res.status(200).send('Email confirmed successfully!');
        } else {
            res.status(400).send('Invalid or expired token.');
        }
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = { register, registrationConfirmation };