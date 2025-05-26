const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const storage = new GridFsStorage({
  url: mongoURI,  // 👈 use 'url' key here, not clientPromise or db
  options: { useNewUrlParser: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads',
    };
  },
  disableMD5: true,
});

module.exports = storage;
