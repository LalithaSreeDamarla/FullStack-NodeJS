import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

// Main App Component
function App() {
  const [tasks, setTasks] = useState([]); // Stores task list
  const [editingTask, setEditingTask] = useState(null); // Currently editing task
  const [statusFilter, setStatusFilter] = useState('all'); // Task status filter
  const [searchQuery, setSearchQuery] = useState(''); // Search text

  // Fetch all tasks from backend on load
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle new task added
  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  // Handle task updated
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Handle delete task
  const handleTaskDeleted = async (taskId) => {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
    fetchTasks();
  };

  // Apply filters to task list
  const filteredTasks = tasks.filter(task => {
    const matchStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Task Manager</h1>

      {/* Filter Dropdown */}
      <label>Filter by Status: </label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Task Form */}
      <AddTaskForm
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        onTaskUpdated={handleTaskUpdated}
        clearEditing={() => setEditingTask(null)}
      />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or assigned user"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginTop: '15px', marginBottom: '15px', padding: '6px', width: '60%' }}
      />

      {/* Task List Display */}
      <TaskList
        tasks={filteredTasks}
        onDelete={handleTaskDeleted}
        onEdit={setEditingTask}
        onUpdate={handleTaskUpdated}
      />
    </div>
  );
}

export default App;
