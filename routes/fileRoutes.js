const express = require('express');
const multer = require('multer');
const storage = require('../config/gridFsStorage');
const { uploadFile, getAllFiles, getFile, downloadFile, deleteFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ storage });

// Route: POST /upload
router.post('/upload', upload.single('file'), uploadFile);
router.get("/files", getAllFiles);
router.get("/files/:id", getFile);
router.get("/files/:id/download", downloadFile);
router.delete("/files/:id", deleteFile);

module.exports = router;
