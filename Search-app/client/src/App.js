import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [days, setDays] = useState(30);
  const [sort, setSort] = useState('date');
  const [form, setForm] = useState({ title: '', projectName: '', completionDate: '' });

  const fetchTasks = () => {
    fetch(`/api/tasks?days=${days}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTasks();
  }, [days]);

  const handleSearch = e => setSearch(e.target.value);

  const handleSort = (a, b) => {
    if (sort === 'project') return a.projectName.localeCompare(b.projectName);
    return new Date(a.completionDate) - new Date(b.completionDate);
  };

  const handleAdd = async e => {
    e.preventDefault();
    if (!form.title || !form.projectName || !form.completionDate) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setTasks(prev => [...prev, data]);
    setForm({ title: '', projectName: '', completionDate: '' });
  };

  return (
    <div className="App">
      <h1>Filtered Task List</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by project..."
          value={search}
          onChange={handleSearch}
        />
        <input
          type="number"
          value={days}
          onChange={e => setDays(e.target.value)}
          min={0}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="project">Sort by Project</option>
        </select>
      </div>

      <form onSubmit={handleAdd}>
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Project Name"
          value={form.projectName}
          onChange={e => setForm({ ...form, projectName: e.target.value })}
        />
        <input
          type="date"
          value={form.completionDate}
          onChange={e => setForm({ ...form, completionDate: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks
          .filter(task => task.projectName.toLowerCase().includes(search.toLowerCase()))
          .sort(handleSort)
          .map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.projectName}<br />
              Completed: {task.completionDate}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
