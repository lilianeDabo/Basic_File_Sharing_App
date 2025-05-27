const FileMeta = require('../models/fileMetaModel');
const { getDB } = require('../config/db');
const { GridFSBucket, ObjectId } = require('mongodb');

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

    // Example: save extra metadata
  const fileMeta = new FileMeta({
    fileId: req.file.id,
    uploader: 'Liliane',
    description: 'A test upload file',
    tags: ['test', 'upload']
  });

  await fileMeta.save();

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
    metadata: fileMeta
  });
};

exports.getAllFiles = async (req, res) => {
  try {
    const db = getDB();
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const files = await bucket.find().toArray();
    res.json(files);
  } catch (err) {
    console.error("Failed to fetch files:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

exports.getFile = async (req, res) => {
  try {
    const db = getDB();
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const file = await bucket.findOne({ _id: new ObjectId(req.params.id) });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.json(file);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch file" });
  }
};

// Download file by id
exports.downloadFile = async (req, res) => {
  try {
    console.log("👉 Received download request for ID:", req.params.id);

    const db = getDB();
    const fileId = new ObjectId(req.params.id);
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const fileDoc = await db.collection('uploads.files').findOne({ _id: fileId });
    console.log("📦 File document lookup result:", fileDoc);

    if (!fileDoc) {
      console.log("❌ File not found");
      return res.status(404).json({ error: "File not found" });
    }

    res.set('Content-Type', fileDoc.contentType || 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="${fileDoc.filename}"`);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('error', (err) => {
      console.error('🚨 Download stream error:', err);
      res.status(500).json({ error: 'Error downloading file' });
    });

    downloadStream.on('open', () => {
      console.log('✅ Download stream opened');
    });

    downloadStream.pipe(res);

  } catch (err) {
    console.error('🔥 Unexpected error:', err);
    res.status(500).json({ error: "Failed to download file" });
  }
};

// Delete file by id
exports.deleteFile = async (req, res) => {
  try {
    const db = getDB();
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const fileId = new ObjectId(req.params.id);
    const filesCollection = db.collection('uploads.files');
    const fileDoc = await filesCollection.findOne({ _id: fileId });

    if (!fileDoc) {
      return res.status(404).json({ error: "File not found" });
    }

    await bucket.delete(fileId);
    res.json({ message: "File deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to delete file" });
  }
};