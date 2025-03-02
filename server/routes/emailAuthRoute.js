const express = require('express');
// const { register, registrationCo00nfirmation } = require('../controllers/emailAuthController');
const { registerUser, userAccountConfirmation } = require('../controllers/teacherController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/confirm', userAccountConfirmation);

module.exports = router;