const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test101',
  database: 'cdcmsDatabase'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
  console.log('Connected to MySQL database!');
  }
});

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

//CREATE NEW ITEM
app.post('/api/users', (req, res) => {
  const {
    lName, fName, mName, suffix, bDay, age, sex, healthHistory,
    addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
    fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
    guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
    guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
  } = req.body;
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
        res.status(201).json({
          id: results.insertId,
          lName, fName, mName, suffix, bDay, age, sex, healthHistory,
          addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
          fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
          guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
          guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
        });
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
        immunizationCard, photo, guardianQCID 
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

//GET item for guardian management
app.get('/api/guardianManagement', (req, res) => {
  const query = `
    SELECT 
      lName, fName, mName, guardianContactNo, guardianEmail,
      guardianLName, guardianFName, guardianMName, 
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

// Multer for file upload
const announcementStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = '../client/src/assets/announcement';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, Date.now() + fileExtension);
  },
});
const announcementUpload = multer({ storage: announcementStorage });

// Create new announcement
app.post('/api/announcement', announcementUpload.single('picture'), (req, res) => {
  const { title, description, dateAndTime } = req.body;
  const picture = req.file ? '/assets/announcement/' + req.file.filename : null;
  const query = `
    INSERT INTO announcement (title, description, dateAndTime, picture)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [title, description, dateAndTime, picture], (err, results) => {
    if (err) {
      console.error('Error inserting announcement into database:', err);
      return res.status(500).json({ error: 'Failed to create announcement' });
    }
    res.status(201).json({
      id: results.insertId,
      title,
      description,
      dateAndTime,
      picture,
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});