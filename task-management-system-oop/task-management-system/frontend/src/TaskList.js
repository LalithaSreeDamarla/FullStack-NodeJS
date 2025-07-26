import React from 'react';
import axios from 'axios';

// Component to display and control list of tasks
function TaskList({ tasks, onDelete, onEdit, onUpdate }) {
  // Toggles task status between completed and pending
  const toggleStatus = async (task) => {
    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
        ...task,
        status: updatedStatus
      });
      onUpdate(res.data);
    } catch (err) {
      console.error('❌ Failed to update task status:', err);
    }
  };

  return (
    <div>
      <h2>📋 Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => toggleStatus(task)}
              />{' '}
              <strong>{task.title}</strong> — <em>{task.status}</em>{' '}
              {task.project && (<span>📁 {task.project}</span>)}

              <button onClick={() => onEdit(task)} style={{ marginLeft: '10px', backgroundColor: '#ffc107', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}>✏️ Edit</button>

              <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px', color: 'white', backgroundColor: 'red', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
