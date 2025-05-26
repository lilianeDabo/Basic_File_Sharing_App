require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
