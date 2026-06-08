/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Project, ClientProject, Testimonial, Achievement } from '../types';

export const DEFAULT_SKILLS: Skill[] = [
  // AI & Automation
  { id: 'sk-ai-1', name: 'OpenAI API', category: 'AI & Automation', percentage: 95 },
  { id: 'sk-ai-2', name: 'Gemini API', category: 'AI & Automation', percentage: 95 },
  { id: 'sk-ai-3', name: 'Prompt Engineering', category: 'AI & Automation', percentage: 90 },
  { id: 'sk-ai-4', name: 'AI Agents', category: 'AI & Automation', percentage: 85 },
  { id: 'sk-ai-5', name: 'LangChain', category: 'AI & Automation', percentage: 80 },
  { id: 'sk-ai-6', name: 'RAG Systems', category: 'AI & Automation', percentage: 85 },
  { id: 'sk-ai-7', name: 'Workflow Automation (n8n/Make)', category: 'AI & Automation', percentage: 90 },

  // Frontend
  { id: 'sk-fe-1', name: 'HTML5 & CSS3', category: 'Frontend', percentage: 95 },
  { id: 'sk-fe-2', name: 'JavaScript (ES6+)', category: 'Frontend', percentage: 92 },
  { id: 'sk-fe-3', name: 'TypeScript', category: 'Frontend', percentage: 88 },
  { id: 'sk-fe-4', name: 'React.js', category: 'Frontend', percentage: 90 },
  { id: 'sk-fe-5', name: 'Next.js', category: 'Frontend', percentage: 85 },
  { id: 'sk-fe-6', name: 'Tailwind CSS', category: 'Frontend', percentage: 95 },

  // Backend
  { id: 'sk-be-1', name: 'Node.js', category: 'Backend', percentage: 88 },
  { id: 'sk-be-2', name: 'Express.js', category: 'Backend', percentage: 85 },
  { id: 'sk-be-3', name: 'REST APIs', category: 'Backend', percentage: 92 },
  { id: 'sk-be-4', name: 'OAuth & Token Auth Concepts', category: 'Backend', percentage: 80 },

  // Databases
  { id: 'sk-db-1', name: 'MongoDB', category: 'Databases', percentage: 85 },
  { id: 'sk-db-2', name: 'MySQL', category: 'Databases', percentage: 82 },
  { id: 'sk-db-3', name: 'PostgreSQL', category: 'Databases', percentage: 80 },

  // Tools
  { id: 'sk-tl-1', name: 'Git', category: 'Tools', percentage: 90 },
  { id: 'sk-tl-2', name: 'GitHub Actions', category: 'Tools', percentage: 85 },
  { id: 'sk-tl-3', name: 'Postman', category: 'Tools', percentage: 92 },
  { id: 'sk-tl-4', name: 'Vercel', category: 'Tools', percentage: 90 },
  { id: 'sk-tl-5', name: 'Netlify', category: 'Tools', percentage: 85 },
  { id: 'sk-tl-6', name: 'Docker', category: 'Tools', percentage: 75 }
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'CognitiveDesk: Multi-Agent Customer Support',
    description: 'An autonomous multi-agent helpdesk system that answers tickets, categorizes bugs, and drafts follow-up emails using RAG and vector retrieval.',
    technologies: ['React.js', 'Node.js', 'Gemini API', 'VectorDB', 'LangChain'],
    category: 'AI Applications',
    imageUrl: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/shivaop9464',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'FlowSync: AI-Driven CRM Automation Syncer',
    description: 'An advanced webflow and CRM connector that captures inbound leads, enriches raw records using LinkedIn AI scrape APIs, and pushes custom notes directly to sales databases.',
    technologies: ['TypeScript', 'Express.js', 'OpenAI API', 'n8n', 'PostgreSQL'],
    category: 'Automation Systems',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/shivaop9464',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'OmniSaaS Metrics: Recurring Contract Portal',
    description: 'A modular multi-tenant dashboard rendering SaaS MRR, subscription pipelines, and billing analytics with custom Stripe webhooks.',
    technologies: ['Next.js', 'Tailwind CSS', 'Recharts', 'MongoDB'],
    category: 'SaaS Products',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/shivaop9464',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'SynthMind: Semantic Code Search Engine',
    description: 'A developer-centric code search interface leveraging abstract syntax tree (AST) traversal and Gemini embedding vectors for codebase query answers.',
    technologies: ['React.js', 'TypeScript', 'Gemini API', 'Docker'],
    category: 'AI Applications',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/shivaop9464',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Automated Invoice Dispatcher',
    description: 'A micro-automation tool parsing raw text files and CSV spreadsheets, generating formatted PDF agreements, and sending automated customized email notifications.',
    technologies: ['Node.js', 'Express.js', 'Postman', 'OAuth2'],
    category: 'Full-Stack Apps',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/shivaop9464',
    featured: false
  }
];

export const DEFAULT_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'client-proj-1',
    clientName: 'NestaMed Care',
    industry: 'Healthcare Services',
    problem: 'Healthcare practitioners spent over 12 hours weekly manually scanning diagnostic text files, creating raw summaries, and transcribing details into their local EHR portal.',
    solution: 'Designed and engineered an automated processing engine using the Gemini API. Incoming patient files are securely parsed, summarized into semantic templates, and mapped into FHIR formats.',
    technologies: ['React.js', 'Express.js', 'Gemini API', 'REST APIs', 'TypeScript'],
    results: 'Reduced record indexing times by 84%, saving individual clinicians upwards of 10 hours per week while eliminating key data misalignments.',
    screenshotUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'client-proj-2',
    clientName: 'Apex Real Estate',
    industry: 'Property Management',
    problem: 'Leads coming from 4 distinct real estate aggregator apps were stored in decentralized formats. Sales executives response times averaged 4 hours per lead due to manual data sorting.',
    solution: 'Engineered a centralized automated webhook pipeline mapping raw leads from API webhooks into a customized React admin suite. Standardized customer categories, automated AI-crafted SMS responses, and synced spreadsheets instantly.',
    technologies: ['Node.js', 'MongoDB', 'React.js', 'Tailwind CSS', 'n8n'],
    results: 'Accelerated speed-to-lead times from 4 hours down to 90 seconds. Boosted active client booking ratios by 35% in thirty days.',
    screenshotUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Rajesh K. Verma',
    position: 'Chief Innovation Officer',
    company: 'Apex Digital Systems',
    review: 'Our business was struggling to coordinate incoming API scopes. Rajesh built an n8n integration combined with Gemini text parsing that automated 80% of our onboarding workflow. His understanding of full-stack AI logic is outstanding.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    clientName: 'Sarah Albright',
    position: 'Founder',
    company: 'NestaMed Biotech',
    review: 'Working with Rajesh was an absolute breeze. He understood our compliance needs, built our EHR summaries platform in record time, and delivered a highly polished, Vercel-glassmorphic frontend that our medical staff loves.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    clientName: 'Kalyan Goud',
    position: 'Managing Director',
    company: 'Telangana Realty',
    review: 'High quality work. The webhook automation dashboard Rajesh engineered eliminated 100% of our manual copy-paste workflows. It operates completely hands-free on Vercel.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', label: 'Projects Delivered', value: 24, suffix: '+', icon: 'CheckCircle2' },
  { id: 'ach-2', label: 'Satisfied Clients', value: 15, suffix: '+', icon: 'Users' },
  { id: 'ach-3', label: 'AI Apps Scaled', value: 8, suffix: '', icon: 'Cpu' },
  { id: 'ach-4', label: 'Hours Saved via Automation', value: 650, suffix: 'h', icon: 'Clock' }
];

export interface EducationMilestone {
  stage: string;
  institution: string;
  duration: string;
  scoreLabel: string;
  scoreVal: string;
}

export const EDUCATION_DATA: EducationMilestone[] = [
  {
    stage: 'MCA (Master of Computer Applications)',
    institution: 'Currently Pursuing (Full-Stack & Intelligent Systems)',
    duration: 'Current',
    scoreLabel: 'Focus',
    scoreVal: 'Advanced Software & AI Agents'
  },
  {
    stage: 'BCA (Bachelor of Computer Applications)',
    institution: 'Chaitanya Deemed to Be University',
    duration: '2022 – 2025',
    scoreLabel: 'CGPA',
    scoreVal: '7.5'
  },
  {
    stage: 'Intermediate (CEC)',
    institution: 'Telangana State Junior College',
    duration: '2020 – 2022',
    scoreLabel: 'Percentage',
    scoreVal: '73%'
  },
  {
    stage: 'SSC (Secondary School Certificate)',
    institution: 'Telangana State Model School',
    duration: '2019 – 2020',
    scoreLabel: 'GPA',
    scoreVal: '8.3'
  }
];
