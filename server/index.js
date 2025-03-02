require('dotenv').config();

const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path');

// Database configuration
const db = require('./config/db');

// Teacher Routes
const teacherRoutes = require('./routes/teacherRoute');
const announcementRoutes = require('./routes/announcementRoute');

// Error Handler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(cookieParser());

app.use('/assets', express.static(path.resolve(__dirname, '..', 'client-vite', 'src', 'assets')));

// For Teachers Only
app.use('/api', teacherRoutes);
app.use('/announcement', announcementRoutes);

// End

// Error handler
app.use(errorHandler);

//GET ALL ITEM
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users from database:', err);
      return res.status(500).json({ error: 'Error fetching users' });
    }
    res.json(results);
  });
});

// CREATE NEW ITEM and ADD TO ATTANDANCE TABLE
app.post('/api/users', (req, res) => {
  const {
    lName, fName, mName, suffix, bDay, age, sex, healthHistory,
    addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
    fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
    guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
    guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
  } = req.body;
  const yearToday = new Date().getFullYear();
  const dateToday = new Date().toISOString().split('T')[0];
  db.query(
    `INSERT INTO users (
      lName, fName, mName, suffix, bDay, age, sex, healthHistory,
      addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
      fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
      guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
      guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lName, fName, mName, suffix, bDay, age, sex, healthHistory,
      addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
      fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
      guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
      guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error adding user');
      } else {
        const studentID = `CDC-${yearToday}${results.insertId.toString().padStart(5, '0')}`;
        db.query(
          `UPDATE users SET studentID = ? WHERE id = ?`,
          [studentID, results.insertId],
          (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
              res.status(500).send('Error updating studentID');
            } else {
              const fullName = `${fName} ${mName} ${lName}`;
              const date = `${dateToday}`;
              db.query(
                `INSERT INTO attendance (schedule, studentID, fullName, status, date) VALUES (?, ?, ?, ?, ?)`,
                [schedule,studentID,fullName,'Enroll',date],
                (attendanceErr) => {
                  if (attendanceErr) {
                    console.log(attendanceErr);
                    res.status(500).send('Error adding attendance');
                  } else {
                    res.status(201).json({
                      id: results.insertId,
                      lName, fName, mName, suffix, bDay, age, sex, healthHistory,
                      addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
                      fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
                      guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
                      guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID, studentID
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//GET item for student management
app.get('/api/studentManagement', (req, res) => {
    const query = `
      SELECT 
        lName, fName, mName, bDay, healthHistory, schedule, 
        guardianLName, guardianFName, guardianMName, psa, 
        immunizationCard, photo, guardianQCID, id
      FROM users
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        return res.status(500).send('Error fetching students');
      }
      res.json(results);
    });
});

//GET item for attendance
app.get('/api/attendance', (req, res) => {
  const query = `
    SELECT 
      schedule, studentID, fullName, status, date
    FROM attendance
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).send('Error fetching students');
    }
    res.json(results);
  });
});

//GET item for guardian management
app.get('/api/guardianManagement', (req, res) => {
  const query = `
    SELECT 
      lName, fName, mName, guardianContactNo, guardianEmail,
      guardianLName, guardianFName, guardianMName, id,
      guardianRelationship
    FROM users
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).send('Error fetching students');
    }
    res.json(results);
  });
});

// Update guardian information based on full name
app.put('/api/updateGuardian/:fullName', (req, res) => {
  const { fullName } = req.params;
  const [fName, mName, lName] = fullName.split(" ");
  const {
    guardianFName, guardianMName, guardianLName,
    guardianContactNo, guardianEmail, guardianRelationship,
  } = req.body;
  const query = `
    UPDATE users
    SET guardianFName = ?, guardianMName = ?, guardianLName = ?, guardianContactNo = ?, 
      guardianEmail = ?, guardianRelationship = ?
    WHERE fName = ? AND mName = ? AND lName = ?
  `;
  db.query(query,
    [
      guardianFName, guardianMName, guardianLName, 
      guardianContactNo, guardianEmail, guardianRelationship,
      fName, mName, lName
    ],
    (err, results) => {
      if (err) {
        console.error('Error updating guardian:', err);
        return res.status(500).json({ error: 'Failed to update guardian' });
      }
      res.json({
        fName, mName, lName, 
        guardianFName, guardianMName, guardianLName,
        guardianContactNo, guardianEmail, guardianRelationship,
      });
    }
  );
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
