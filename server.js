// main application file

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Import file routes
const fileRoutes = require('./routes/fileRoutes');

// Use file routes
app.use('/api/files', fileRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
