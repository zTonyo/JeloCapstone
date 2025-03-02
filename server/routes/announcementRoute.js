const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
const { upload } = require("../utils/uploadImage");
const { createAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncement } = require('../controllers/announcementController');
const { route } = require('./teacherRoute');

router.use(verifyToken);

router.get('/get', getAnnouncement);
router.post('/create', upload('announcement').single("image"), createAnnouncement);
router.put('/update/:id', upload('announcement').single("image"), updateAnnouncement);
router.delete('/delete/:id', deleteAnnouncement)

module.exports = router;
