const FileMeta = require('../models/fileMetaModel');

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
