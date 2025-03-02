const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const { registerUser, userAccountConfirmation, userLogin, getUsers, userLogout } = require('../controllers/teacherController');
const { getProfile, updateProfile } = require('../controllers/userController')
const { upload } = require("../utils/uploadImage");

router.post('/teacher/signup/', registerUser);
router.post('/teacher/signin/', userLogin);
router.get('/teacher/confirm/:token', userAccountConfirmation);
router.get('/teacher/logout', userLogout);

// protected routes
router.get('/teacher/users/', verifyToken, getUsers);
router.get('/teacher/profile', verifyToken, getProfile);
router.post('/teacher/update-profile', verifyToken, upload('profiles').single("image"), updateProfile);


module.exports = router;
