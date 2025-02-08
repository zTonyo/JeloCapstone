const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());

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
    process.exit();
  }
  console.log('Connected to MySQL database!');
});

// // Example API Route to fetch users
// app.get('/api/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Error fetching users');
//     } else {
//       res.json(results);
//     }
//   });
// });

// Example API Route to add a user
app.post('/api/users', (req, res) => {
    const {
      lName,
      fName,
      mName,
      suffix,
      bDay,
      age,
      sex,
      healthHistory,
      addressNumber,
      brgy,
      municipality,
      fatherLName,
      fatherFName,
      fatherMName,
      fatherContactNo,
      motherLName,
      motherFName,
      motherMName,
      motherContactNo,
      guardianLName,
      guardianFName,
      guardianMName,
      guardianContatNo,
      guardianRelationship,
      guardianEmail,
      guardianOccupation,
      schedule,
      psa,
      immunizationCard,
      photo,
      guardianQCID
    } = req.body;
  
    db.query(
      `INSERT INTO users (
        lName, fName, mName, suffix, bDay, age, sex, healthHistory,
        addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
        fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
        guardianLName, guardianFName, guardianMName, guardianContatNo, guardianRelationship,
        guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lName, fName, mName, suffix, bDay, age, sex, healthHistory,
        addressNumber, brgy, municipality, fatherLName, fatherFName, fatherMName,
        fatherContactNo, motherLName, motherFName, motherMName, motherContactNo,
        guardianLName, guardianFName, guardianMName, guardianContatNo, guardianRelationship,
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
            guardianLName, guardianFName, guardianMName, guardianContatNo, guardianRelationship,
            guardianEmail, guardianOccupation, schedule, psa, immunizationCard, photo, guardianQCID
          });
        }
      }
    );
});


// API route to get student management
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


// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
