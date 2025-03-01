require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { query } = require('express');


exports.createAnnouncement = async (req, res) => {
    try {
        const { title, description, dateAndTime } = req.body;
        const picture = req.file ? `/assets/announcement/${req.file.filename}` : null; // Save file path
    
        const query = `
          INSERT INTO announcement (user_id, title, picture, description, upload_date)
          VALUES (?, ?, ?, ?, ?)
        `;
        const values = [req.user.user_id, title, picture, description, dateAndTime]; // Assuming user_id is available in req.user
    
        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error creating announcement:', err);
            return res.status(500).json({ message: 'Database error', error: err });
          }
          res.status(201).json({ message: 'Announcement created successfully', id: result.insertId });
        });
      } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).json({ message: 'Server error', error });
      }
}

exports.updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dateAndTime } = req.body;
        const picture = req.file ? `announcement/${req.file.filename}` : null; // Save file path
    
        // Fetch existing announcement to check if it exists
        const fetchQuery = 'SELECT * FROM announcement WHERE id = ?';
        db.query(fetchQuery, [id], (err, results) => {
          if (err) {
            console.error('Error fetching announcement:', err);
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: 'Announcement not found' });
          }
    
          const existingAnnouncement = results[0];
    
          // Update query
          const updateQuery = `
            UPDATE announcement
            SET title = ?, description = ?, date_posted = ?, picture = ?
            WHERE id = ?
          `;
          const values = [
            title || existingAnnouncement.title,
            description || existingAnnouncement.description,
            dateAndTime || existingAnnouncement.date_posted,
            picture || existingAnnouncement.picture,
            id,
          ];
    
          db.query(updateQuery, values, (err, result) => {
            if (err) {
              console.error('Error updating announcement:', err);
              return res.status(500).json({ message: 'Database error', error: err });
            }
            res.json({ message: 'Announcement updated successfully' });
          });
        });
      } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).json({ message: 'Server error', error });
      }
}

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Fetch existing announcement to check if it exists
        const fetchQuery = 'SELECT * FROM announcement WHERE id = ?';
        db.query(fetchQuery, [id], (err, results) => {
          if (err) {
            console.error('Error fetching announcement:', err);
            return res.status(500).json({ message: 'Database error', error: err });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: 'Announcement not found' });
          }
    
          // Delete query
          const deleteQuery = 'DELETE FROM announcement WHERE id = ?';
          db.query(deleteQuery, [id], (err, result) => {
            if (err) {
              console.error('Error deleting announcement:', err);
              return res.status(500).json({ message: 'Database error', error: err });
            }
            res.json({ message: 'Announcement deleted successfully' });
          });
        });
      } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ message: 'Server error', error });
      }
}

exports.getAnnouncement = async (req, res) => {
    try {
        const userId = req.user.user_id; // Get the current user's ID from the request

        // Query to fetch announcements created by the current user
        const query = `
            SELECT * FROM announcement
            WHERE user_id = ?
            ORDER BY date_posted DESC;
        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching announcements:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Return the announcements
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}