// This class manages all task-related operations in memory (like a temporary database)
class TaskManagement {
  constructor() {
    this.tasks = [];
    this.nextTaskId = 1; // Auto-incrementing task ID
  }

  // Add a new task
  addTask({ title, assignedTo = '', dueDate = '', status = 'pending', project = '' }) {
    const task = {
      id: this.nextTaskId++,
      title,
      assignedTo,
      dueDate,
      status,
      project,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  // Return all tasks
  getTasks() {
    return [...this.tasks];
  }

  // Update a task by ID
  updateTask(id, updates) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  // Delete a task by ID
  deleteTask(id) {
    const lengthBefore = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    return this.tasks.length < lengthBefore;
  }
}

module.exports = TaskManagement;
