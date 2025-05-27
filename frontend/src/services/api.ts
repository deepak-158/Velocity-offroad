// This file provides a compatibility layer for the frontend to interact with the backend services.
import dataService, { Member, Project } from './dataService';

// Function to check if the backend server is running
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    // Try to fetch data files directly
    const response = await fetch('/data/members.json');
    return response.ok;
  } catch (error) {
    console.error('Error connecting to data files:', error);
    return false;
  }
};

// Compatibility layer for the members service
export const membersService = {
  getAll: async (): Promise<Member[]> => {
    return dataService.getAllMembers();
  },

  getById: async (id: string): Promise<Member> => {
    const member = await dataService.getMemberById(id);
    if (!member) throw new Error(`Member with ID ${id} not found`);
    return member;
  }
};

// Compatibility layer for the projects service
export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    return dataService.getAllProjects();
  },

  getById: async (id: string): Promise<Project> => {
    const project = await dataService.getProjectById(id);
    if (!project) throw new Error(`Project with ID ${id} not found`);
    return project;
  }
};
