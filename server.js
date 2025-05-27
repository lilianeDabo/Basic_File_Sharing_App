const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const connectMongoose = require('./config/mongoose');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/', fileRoutes);

// Wait for both connections before starting server
Promise.all([
  connectDB(),
  connectMongoose(process.env.MONGO_URI)
])
.then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error connecting to databases:', err);
});
