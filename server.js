const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const connectMongoose = require('./config/mongoose');
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // <--- add this for form data
app.use(express.static('public'));

// Routes
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// Wait for both DB connections
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
