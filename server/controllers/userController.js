const db = require('../config/db');
const cookieParser = require("cookie-parser");
const verifyToken = require('../middleware/verifyToken');
const session = require("express-session");
const { query } = require('express');


exports.getProfile =  async (req, res) => {
    try {
        const userId = req.user.user_id;
        const query = `
            SELECT uc.user_id, uc.email, uc.user_role, 
                   ui.fullname, ui.birthday, ui.age, ui.gender, ui.address, ui.contact_number, ui.profile_path 
            FROM user_credential uc 
            LEFT JOIN user_info ui ON uc.user_id = ui.user_id
            WHERE uc.user_id = ?
        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(results[0]);
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const { name, birthdate, age, gender, address, contact_number, role } = req.body;
        
        // ✅ Store only relative path if a new image is uploaded
        const imagePath = req.file ? `/assets/profiles/${req.file.filename}` : undefined;

        // ✅ Construct the query dynamically based on whether a new image is uploaded
        let query;
        let queryParams;

        if (imagePath) {
            // If a new image is uploaded, update the profile_path
            query = `
                UPDATE user_info 
                SET fullname=?, birthday=?, age=?, gender=?, address=?, contact_number=?, profile_path=?
                WHERE user_id=?
            `;
            queryParams = [name, birthdate, age, gender, address, contact_number, imagePath, req.user.user_id];
        } else {
            // If no new image is uploaded, do not update the profile_path
            query = `
                UPDATE user_info 
                SET fullname=?, birthday=?, age=?, gender=?, address=?, contact_number=?
                WHERE user_id=?
            `;
            queryParams = [name, birthdate, age, gender, address, contact_number, req.user.user_id];
        }

        db.query(query, queryParams, (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.json({ message: "Profile updated successfully" });
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};