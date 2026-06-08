/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'AI & Automation' | 'Tools' | string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'AI Applications' | 'SaaS Products' | 'Full-Stack Apps' | 'Automation Systems' | 'Client Projects' | string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface ClientProject {
  id: string;
  clientName: string;
  industry: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  screenshotUrl: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  position: string;
  company: string;
  review: string;
  photoUrl: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
