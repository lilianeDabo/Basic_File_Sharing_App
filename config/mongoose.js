const mongoose = require('mongoose');

const connectMongoose = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log('✅ Mongoose connected');
  } catch (err) {
    console.error('Mongoose connection error:', err);
  }
};

module.exports = connectMongoose;
