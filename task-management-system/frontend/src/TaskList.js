import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This component is responsible for fetching and displaying the list of tasks
function TaskList() {
  // useState hook to store tasks retrieved from the backend
  const [tasks, setTasks] = useState([]);

  // useEffect runs once after the component loads — we use it to fetch tasks
  useEffect(() => {
    // Make a GET request to our Node.js backend to fetch all tasks
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        // Save the response data (task list) into the local state
        setTasks(response.data);
      })
      .catch(error => {
        // Log any errors that occur during the request
        console.error('Error fetching tasks:', error);
      });
  }, []); // Empty dependency array = run only once after component mounts

  return (
    <div>
      <h2>📋 Task List</h2>

      {/* If no tasks exist, show a message */}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        // Otherwise, display all tasks in a list
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
