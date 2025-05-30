const FileMetadata = require('../models/fileMetaModel');

exports.checkOwnership = async (req, res, next) => {
  try {
    const fileMeta = await FileMetadata.findOne({ fileId: req.params.id });
    if (!fileMeta) return res.status(404).json({ message: 'File not found' });

    // Check if the logged-in user is the uploader
    if (fileMeta.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: not your file' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
