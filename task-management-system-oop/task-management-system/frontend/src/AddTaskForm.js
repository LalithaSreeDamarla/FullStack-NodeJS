import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Form for adding or editing tasks
function AddTaskForm({ onTaskAdded, onTaskUpdated, editingTask, clearEditing }) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [project, setProject] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setAssignedTo(editingTask.assignedTo || '');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setStatus(editingTask.status || 'pending');
      setProject(editingTask.project || '');
    } else {
      clearForm();
    }
  }, [editingTask]);

  // Clear the form
  const clearForm = () => {
    setTitle('');
    setAssignedTo('');
    setDueDate('');
    setStatus('pending');
    setProject('');
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        const res = await axios.put(`http://localhost:5000/api/tasks/${editingTask.id}`, {
          title, assignedTo, dueDate, status, project
        });
        onTaskUpdated(res.data);
        clearEditing();
      } else {
        const res = await axios.post('http://localhost:5000/api/tasks', {
          title, assignedTo, dueDate, status, project
        });
        onTaskAdded(res.data);
      }

      clearForm();
    } catch (err) {
      console.error('❌ Task save failed:', err);
      alert('Something went wrong while saving the task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <h2>{editingTask ? '✏️ Edit Task' : '➕ Add New Task'}</h2>

      <input type="text" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)} />{' '}
      <input type="text" placeholder="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />{' '}
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />{' '}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>{' '}
      <input type="text" placeholder="Project Name" value={project} onChange={(e) => setProject(e.target.value)} />{' '}
      <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
      {editingTask && (
        <button type="button" onClick={() => { clearEditing(); clearForm(); }} style={{ marginLeft: '10px' }}>Cancel</button>
      )}
    </form>
  );
}

export default AddTaskForm;
