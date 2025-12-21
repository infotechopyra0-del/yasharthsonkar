export interface Project {
  _id: string;
  title: string;
  description: string;
  projectImage?: string;
  techStack: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Projects = Project;
