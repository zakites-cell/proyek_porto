export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  experience: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'design'
  | '3d'
  | 'tools';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  screenshotUrl: string;
  color: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  profession: string[];
  bio: string;
  education: string;
  interests: string[];
  careerGoal: string;
  email: string;
  cvUrl: string;
  social: Record<string, string>;
}

export interface SectionConfig {
  id: string;
  label: string;
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
}
