const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/teachers/signup/', teacherController.registerUser);
router.get('/users/', teacherController.getUsers);

module.exports = router;
