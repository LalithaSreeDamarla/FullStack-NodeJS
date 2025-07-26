require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Use task-related routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Task Manager API running without MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
