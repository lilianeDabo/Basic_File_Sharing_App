const mongoose = require('mongoose');

const fileMetaSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: String,
  tags: [String],
  downloads: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('FileMeta', fileMetaSchema);
