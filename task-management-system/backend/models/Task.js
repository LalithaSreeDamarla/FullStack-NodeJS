const mongoose = require('mongoose');

// Define the structure of a Task document
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // task must have a title
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  assignedTo: {
    type: String // could be a user name or email if you expand later
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Export model
module.exports = mongoose.model('Task', taskSchema);