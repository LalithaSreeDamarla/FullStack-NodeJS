const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: 1, title: "Build login page", projectName: "ecommerce", completionDate: "2024-06-01" },
  { id: 2, title: "Deploy GenAI chatbot", projectName: "genai", completionDate: "2025-06-28" },
  { id: 3, title: "Fix UI bug", projectName: "hrms", completionDate: "2024-12-15" }
];

// Filter helper
function filterTasks(tasks, days = 30) {
  const today = new Date();
  return tasks.filter(task => {
    const completed = new Date(task.completionDate);
    const daysPending = (today - completed) / (1000 * 60 * 60 * 24);
    return daysPending > days || task.projectName.toLowerCase().includes("genai");
  });
}

// GET /api/tasks?days=15
app.get('/api/tasks', (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const filtered = filterTasks(tasks, days);
  res.json(filtered);
});

// POST /api/tasks (add new task)
app.post('/api/tasks', (req, res) => {
  const { title, projectName, completionDate } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    projectName,
    completionDate
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
