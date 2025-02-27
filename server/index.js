require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const path = require('path');

// Database configuration
const db = require('./config/db');

// Teacher Routes
const teacherRoutes = require('./routes/teacherRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


// For Teachers Only
app.use('/api', teacherRoutes);


// End


// MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASENAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//   console.log('Connected to MySQL database!');
//   }
// });

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

// //CREATE NEW ITEM WITH ATTENDANCE
// app.post('/api/users', (req, res) => {
//   const {
//     lName, fName, mName, suffix, bDay, age, sex, healthHistory,
//     addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
//     fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
//     guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
//     guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
//   } = req.body;
//   db.query(
//     `INSERT INTO users (
//       lName, fName, mName, suffix, bDay, age, sex, healthHistory,
//       addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
//       fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
//       guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
//       guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       lName, fName, mName, suffix, bDay, age, sex, healthHistory,
//       addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
//       fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
//       guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
//       guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
//     ],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Error adding user');
//       }
//       const date = new Date().toISOString().split('T')[0];
//       db.query(
//         `INSERT INTO attendance (fName, mName, lName, date, status) VALUES (?, ?, ?, ?, ?)`,
//         [fName, mName, lName, date, 'enroll'],
//         (attendanceErr,attendanceResults) => {
//           if (attendanceErr) {
//             console.log(attendanceErr);
//             return res.status(500).send('Error adding attendance')
//           }
//           res.status(201).json({
//             id: results.insertId,
//             lName, fName, mName, suffix, bDay, age, sex, healthHistory,
//             addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
//             fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
//             guardianLName, guardianFName, guardianMName, guardianContactNo, guardianRelationship,
//             guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
//           });
//         }
//       );
//     }
//   );
// });

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

app.use('/assets', express.static(path.join(__dirname, '../client/src/assets')));

// Get all announcements
app.get('/api/announcement', (req, res) => {
  const query = 'SELECT * FROM announcement';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching announcements:', err);
      return res.status(500).json({ error: 'Failed to fetch announcements' });
    }
    res.status(200).json(results);
  });
});

// DELETE endpoint announcement
app.delete('/api/announcement', (req, res) => {
  const { description } = req.body;
  const query = 'DELETE FROM announcement WHERE description = ?';
  db.query(query, [description], (err, result) => {
    if (err) {
      console.error('Error deleting announcement:', err);
      return res.status(500).json({ message: 'Error deleting announcement' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Announcement deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Announcement not found' });
    }
  });
});

app.put('/api/announcement/:id', announcementUpload.single('picture'), (req, res) => {
  const { id } = req.params;
  const { title, description, dateAndTime } = req.body;
  const picture = req.file ? '/assets/announcement/' + req.file.filename : null;
  const query = `
    UPDATE announcement
    SET title = ?, description = ?, dateAndTime = ?, picture = ?
    WHERE id = ?  // Use id as the condition for updating
  `;
  db.query(query, [title, description, dateAndTime, picture, id], (err, results) => {
    if (err) {
      console.error('Error updating announcement:', err);
      return res.status(500).json({ error: 'Failed to update announcement' });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: 'Announcement updated successfully',
        id,
        title,
        description,
        dateAndTime,
        picture,
      });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  });
});

app.get('/api/announcement', (req, res) => {
  db.query('SELECT title, description, dataAndTime, picture FROM announcements', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err });
    }
    res.json(results);
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
