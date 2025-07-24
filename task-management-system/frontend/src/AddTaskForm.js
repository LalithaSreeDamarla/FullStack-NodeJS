import React, { useState } from 'react';
import axios from 'axios';

function AddTaskForm({ onTaskAdded }) {
  // Form state to hold input values
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Log form data to debug
    console.log('🔼 Submitting task:', { title, assignedTo, dueDate, status });

    try {
      // Send POST request to backend to create a new task
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title,
        assignedTo,
        dueDate,
        status
      });

      // Clear the form after success
      setTitle('');
      setAssignedTo('');
      setDueDate('');
      setStatus('pending');

      // Notify parent to refresh task list
      onTaskAdded(res.data);
    } catch (err) {
      console.error('❌ Error adding task:', err.response?.data || err.message);
      alert('Task creation failed. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <h2>➕ Add New Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />{' '}
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />{' '}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />{' '}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>{' '}
      <button type="submit">Create Task</button>
    </form>
  );
}

export default AddTaskForm;
