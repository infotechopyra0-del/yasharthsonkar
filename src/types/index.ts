export type { Project, Projects } from './projects';
export type { Service, Services, Experience, Skill, Skills } from './services';

// Blog Post Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  category: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
