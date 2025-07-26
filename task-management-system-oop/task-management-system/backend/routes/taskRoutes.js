const express = require('express');
const router = express.Router();
const TaskManagement = require('../models/TaskManagement');
const ProjectService = require('../models/ProjectService');

// Create instances of the in-memory services
const taskService = new TaskManagement();
const projectService = new ProjectService();

// Get all tasks
router.get('/', (req, res) => {
  res.json(taskService.getTasks());
});

// Create a new task
router.post('/', (req, res) => {
  try {
    const task = taskService.addTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing task
router.put('/:id', (req, res) => {
  const updated = taskService.updateTask(Number(req.params.id), req.body);
  updated ? res.json(updated) : res.status(404).json({ message: 'Task not found' });
});

// Delete a task
router.delete('/:id', (req, res) => {
  const deleted = taskService.deleteTask(Number(req.params.id));
  deleted ? res.json({ message: 'Task deleted' }) : res.status(404).json({ message: 'Task not found' });
});

// Create a new project
router.post('/projects', (req, res) => {
  const project = projectService.addProject(req.body.name);
  res.status(201).json(project);
});

// Get all projects
router.get('/projects', (req, res) => {
  res.json(projectService.getProjects());
});

module.exports = router;
