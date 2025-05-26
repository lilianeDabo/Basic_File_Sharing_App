const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Use routes
app.use('/', fileRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
