require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(); // get db instance from the URI
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
};

module.exports = { client, connectDB, getDB };
