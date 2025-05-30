const express = require('express');
const multer = require('multer');
const storage = require('../config/gridFsStorage');
const { uploadFile, getAllFiles, getFile, downloadFile, deleteFile } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const { checkOwnership } = require('../middleware/checkOwnership');

const router = express.Router();
const upload = multer({ storage });

// Route: POST /upload
router.post('/upload', protect, upload.single('file'), uploadFile);
router.get("/files", getAllFiles);
router.get("/files/:id", getFile);
router.get("/files/:id/download", downloadFile);
router.delete("/files/:id", protect, checkOwnership, deleteFile);

module.exports = router;
