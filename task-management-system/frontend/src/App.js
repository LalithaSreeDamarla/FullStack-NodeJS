import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // Used to refresh TaskList

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Task Manager</h1>
      <AddTaskForm onTaskAdded={() => setRefreshKey(prev => prev + 1)} />
      <TaskList key={refreshKey} />
    </div>
  );
}

export default App;
