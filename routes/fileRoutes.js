const express = require('express');
const multer = require('multer');
const storage = require('../config/gridFsStorage');
const { uploadFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ storage });

// Route: POST /upload
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
