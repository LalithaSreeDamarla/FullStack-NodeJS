import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // NEW
  const [searchQuery, setSearchQuery] = useState('');


  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error('❌ Failed to delete task:', err);
    }
  };

  // NEW: Filtered tasks based on selected status
  const filteredTasks = tasks.filter(task => {
    const matchStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Task Manager</h1>

      {/* ✅ Status Filter Dropdown */}
      <label>Filter by Status: </label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <AddTaskForm
        onTaskAdded={handleTaskAdded}
        editingTask={editingTask}
        onTaskUpdated={handleTaskUpdated}
        clearEditing={() => setEditingTask(null)}
      />

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by title or assigned user"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginTop: '15px', marginBottom: '15px', padding: '6px', width: '60%' }}
      />

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
