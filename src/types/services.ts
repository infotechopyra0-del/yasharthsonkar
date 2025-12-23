export interface Service {
  _id: string;
  name: string;
  description: string;
  serviceImage?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Services = Service;

export interface Experience {
  _id: string;
  institutionName?: string;
  position: string;
  title?: string;
  duration: string;
  description: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  isCurrentJob?: boolean;
  isCurrent?: boolean;
  location?: string;
}

export interface Skill {
  _id: string;
  name: string;
  skillName?: string;
  category: string;
  level?: number;
  proficiencyLevel?: number;
  icon?: string;
  skillImage?: string;
  description?: string;
  displayOrder?: number;
}

export type Skills = Skill;
