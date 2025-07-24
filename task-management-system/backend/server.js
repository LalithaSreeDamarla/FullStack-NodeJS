// Load environment variables from .env file
require('dotenv').config();

// Import core packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// ✅ Import and mount task routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes); // All routes now prefixed with /api/tasks

// Test route
app.get('/', (req, res) => {
  res.send('✅ Task Manager API is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
