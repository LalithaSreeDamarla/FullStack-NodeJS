// This class manages project creation and retrieval in memory
class ProjectService {
  constructor() {
    this.projects = [];
    this.nextProjectId = 1;
  }

  // Create a new project
  addProject(name) {
    const project = {
      id: this.nextProjectId++,
      name,
      createdAt: new Date()
    };
    this.projects.push(project);
    return project;
  }

  // Get all projects
  getProjects() {
    return [...this.projects];
  }
}

module.exports = ProjectService;
