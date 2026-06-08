/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Skill, Project, ClientProject, Testimonial, ContactMessage } from '../types';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, doc, setDoc, deleteDoc } from 'firebase/firestore';
import {
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENT_PROJECTS,
  DEFAULT_TESTIMONIALS
} from '../data/defaults';

interface PortfolioContextProps {
  skills: Skill[];
  projects: Project[];
  clientProjects: ClientProject[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  firestoreSyncStatus: 'connected' | 'error' | 'syncing';
  firestoreError: string | null;
  // Skills CRUD
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  // Projects CRUD
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // Client Projects CRUD
  addClientProject: (clientProject: Omit<ClientProject, 'id'>) => void;
  updateClientProject: (clientProject: ClientProject) => void;
  deleteClientProject: (id: string) => void;
  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  // Messages Integration & Simulation
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
  deleteContactMessage: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientProjects, setClientProjects] = useState<ClientProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [firestoreSyncStatus, setFirestoreSyncStatus] = useState<'connected' | 'error' | 'syncing'>('syncing');
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initialize data from localStorage or fallback to defaults as instant optimistic cache
    try {
      const storedSkills = localStorage.getItem('portfolio_skills');
      if (storedSkills) {
        setSkills(JSON.parse(storedSkills));
      } else {
        localStorage.setItem('portfolio_skills', JSON.stringify(DEFAULT_SKILLS));
        setSkills(DEFAULT_SKILLS);
      }

      const storedProjects = localStorage.getItem('portfolio_projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem('portfolio_projects', JSON.stringify(DEFAULT_PROJECTS));
        setProjects(DEFAULT_PROJECTS);
      }

      const storedClientProjects = localStorage.getItem('portfolio_client_projects');
      if (storedClientProjects) {
        setClientProjects(JSON.parse(storedClientProjects));
      } else {
        localStorage.setItem('portfolio_client_projects', JSON.stringify(DEFAULT_CLIENT_PROJECTS));
        setClientProjects(DEFAULT_CLIENT_PROJECTS);
      }

      const storedTestimonials = localStorage.getItem('portfolio_testimonials');
      if (storedTestimonials) {
        setTestimonials(JSON.parse(storedTestimonials));
      } else {
        localStorage.setItem('portfolio_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
        setTestimonials(DEFAULT_TESTIMONIALS);
      }

      const storedMessages = localStorage.getItem('portfolio_messages');
      let localMsgs: ContactMessage[] = [];
      if (storedMessages) {
        localMsgs = JSON.parse(storedMessages);
        setMessages(localMsgs);
      } else {
        localStorage.setItem('portfolio_messages', JSON.stringify([]));
        setMessages([]);
      }

      // 2. Synchronize lists and seed collections in Firestore asynchronously
      (async () => {
        let hasError = false;
        let errorMessage: string | null = null;

        // Helper to sync Skills
        const syncSkills = async () => {
          try {
            const skillsSnap = await getDocs(collection(db, 'skills'));
            if (skillsSnap.empty) {
              console.log("Seeding default skills in Firestore...");
              for (const item of DEFAULT_SKILLS) {
                await setDoc(doc(db, 'skills', item.id), { ...item, createdAt: serverTimestamp() });
              }
            } else {
              const fireSkills: Skill[] = [];
              skillsSnap.forEach((ds) => {
                const data = ds.data();
                fireSkills.push({
                  id: ds.id,
                  name: data.name || '',
                  category: data.category || '',
                  percentage: Number(data.percentage) || 0
                });
              });
              setSkills(fireSkills);
              localStorage.setItem('portfolio_skills', JSON.stringify(fireSkills));
            }
          } catch (err: any) {
            console.warn("Unable to sync skills with Firestore:", err);
            hasError = true;
            if (!errorMessage) errorMessage = err?.message || String(err);
          }
        };

        // Helper to sync Projects
        const syncProjects = async () => {
          try {
            const projectsSnap = await getDocs(collection(db, 'projects'));
            if (projectsSnap.empty) {
              console.log("Seeding default projects in Firestore...");
              for (const item of DEFAULT_PROJECTS) {
                await setDoc(doc(db, 'projects', item.id), { ...item, createdAt: serverTimestamp() });
              }
            } else {
              const fireProjects: Project[] = [];
              projectsSnap.forEach((ds) => {
                const data = ds.data();
                fireProjects.push({
                  id: ds.id,
                  title: data.title || '',
                  description: data.description || '',
                  technologies: data.technologies || [],
                  category: data.category || '',
                  imageUrl: data.imageUrl || '',
                  liveUrl: data.liveUrl || '',
                  githubUrl: data.githubUrl || '',
                  featured: Boolean(data.featured)
                });
              });
              setProjects(fireProjects);
              localStorage.setItem('portfolio_projects', JSON.stringify(fireProjects));
            }
          } catch (err: any) {
            console.warn("Unable to sync projects with Firestore:", err);
            hasError = true;
            if (!errorMessage) errorMessage = err?.message || String(err);
          }
        };

        // Helper to sync Client Projects (Case Studies)
        const syncClientProjects = async () => {
          try {
            const cpSnap = await getDocs(collection(db, 'client_projects'));
            if (cpSnap.empty) {
              console.log("Seeding default client projects in Firestore...");
              for (const item of DEFAULT_CLIENT_PROJECTS) {
                await setDoc(doc(db, 'client_projects', item.id), { ...item, createdAt: serverTimestamp() });
              }
            } else {
              const fireCps: ClientProject[] = [];
              cpSnap.forEach((ds) => {
                const data = ds.data();
                fireCps.push({
                  id: ds.id,
                  clientName: data.clientName || '',
                  industry: data.industry || '',
                  problem: data.problem || '',
                  solution: data.solution || '',
                  technologies: data.technologies || [],
                  results: data.results || '',
                  screenshotUrl: data.screenshotUrl || ''
                });
              });
              setClientProjects(fireCps);
              localStorage.setItem('portfolio_client_projects', JSON.stringify(fireCps));
            }
          } catch (err: any) {
            console.warn("Unable to sync client projects with Firestore:", err);
            hasError = true;
            if (!errorMessage) errorMessage = err?.message || String(err);
          }
        };

        // Helper to sync Testimonials
        const syncTestimonials = async () => {
          try {
            const testSnap = await getDocs(collection(db, 'testimonials'));
            if (testSnap.empty) {
              console.log("Seeding default testimonials in Firestore...");
              for (const item of DEFAULT_TESTIMONIALS) {
                await setDoc(doc(db, 'testimonials', item.id), { ...item, createdAt: serverTimestamp() });
              }
            } else {
              const fireTestimonials: Testimonial[] = [];
              testSnap.forEach((ds) => {
                const data = ds.data();
                fireTestimonials.push({
                  id: ds.id,
                  clientName: data.clientName || '',
                  position: data.position || '',
                  company: data.company || '',
                  review: data.review || '',
                  photoUrl: data.photoUrl || ''
                });
              });
              setTestimonials(fireTestimonials);
              localStorage.setItem('portfolio_testimonials', JSON.stringify(fireTestimonials));
            }
          } catch (err: any) {
            console.warn("Unable to sync testimonials with Firestore:", err);
            hasError = true;
            if (!errorMessage) errorMessage = err?.message || String(err);
          }
        };

        // Helper to sync Contact Messages
        const syncMessages = async () => {
          try {
            const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(50));
            const querySnapshot = await getDocs(q);
            const fireMsgs: ContactMessage[] = [];
            querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              fireMsgs.push({
                id: docSnap.id,
                name: data.name || '',
                email: data.email || '',
                subject: data.subject || '',
                message: data.message || '',
                timestamp: data.timestamp || new Date().toLocaleString()
              });
            });
            if (fireMsgs.length > 0) {
              const merged = [...fireMsgs];
              localMsgs.forEach(lm => {
                if (!merged.some(fm => fm.name === lm.name && fm.message === lm.message)) {
                  merged.push(lm);
                }
              });
              setMessages(merged);
              localStorage.setItem('portfolio_messages', JSON.stringify(merged));
            }
          } catch (err: any) {
            console.warn("Unable to sync contact messages with Firestore:", err);
            hasError = true;
            if (!errorMessage) errorMessage = err?.message || String(err);
          }
        };

        // Run loaders sequentially but independently so errors are isolated
        await syncSkills();
        await syncProjects();
        await syncClientProjects();
        await syncTestimonials();
        await syncMessages();

        if (hasError) {
          setFirestoreSyncStatus('error');
          setFirestoreError(errorMessage);
        } else {
          setFirestoreSyncStatus('connected');
          setFirestoreError(null);
        }
      })();

      const storedTheme = localStorage.getItem('portfolio_theme');
      if (storedTheme === 'light') {
        setTheme('light');
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        setTheme('dark');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } catch (e) {
      console.error('Error loading portfolio state from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Theme Sync helper
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  // Helper helper to generate simple random IDs
  const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

  // --- Skills CRUD ---
  const addSkill = async (newSkill: Omit<Skill, 'id'>) => {
    const id = makeId('sk');
    const skill: Skill = { ...newSkill, id };
    const updated = [...skills, skill];
    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'skills', id), { ...skill, createdAt: serverTimestamp() });
    } catch (err) {
      console.warn("Firestore Skill Add failed:", err);
    }
  };

  const updateSkill = async (updatedSkill: Skill) => {
    const updated = skills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s));
    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'skills', updatedSkill.id), { ...updatedSkill, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn("Firestore Skill Update failed:", err);
    }
  };

  const deleteSkill = async (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (err) {
      console.warn("Firestore Skill Delete failed:", err);
    }
  };

  // --- Projects CRUD ---
  const addProject = async (newProject: Omit<Project, 'id'>) => {
    const id = makeId('proj');
    const project: Project = { ...newProject, id };
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'projects', id), { ...project, createdAt: serverTimestamp() });
    } catch (err) {
      console.warn("Firestore Project Add failed:", err);
    }
  };

  const updateProject = async (updatedProject: Project) => {
    const updated = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'projects', updatedProject.id), { ...updatedProject, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn("Firestore Project Update failed:", err);
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.warn("Firestore Project Delete failed:", err);
    }
  };

  // --- Client Projects CRUD ---
  const addClientProject = async (newClientProject: Omit<ClientProject, 'id'>) => {
    const id = makeId('cl-proj');
    const clientProject: ClientProject = { ...newClientProject, id };
    const updated = [...clientProjects, clientProject];
    setClientProjects(updated);
    localStorage.setItem('portfolio_client_projects', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'client_projects', id), { ...clientProject, createdAt: serverTimestamp() });
    } catch (err) {
      console.warn("Firestore ClientProject Add failed:", err);
    }
  };

  const updateClientProject = async (updatedClientProject: ClientProject) => {
    const updated = clientProjects.map((cp) => (cp.id === updatedClientProject.id ? updatedClientProject : cp));
    setClientProjects(updated);
    localStorage.setItem('portfolio_client_projects', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'client_projects', updatedClientProject.id), { ...updatedClientProject, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn("Firestore ClientProject Update failed:", err);
    }
  };

  const deleteClientProject = async (id: string) => {
    const updated = clientProjects.filter((cp) => cp.id !== id);
    setClientProjects(updated);
    localStorage.setItem('portfolio_client_projects', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'client_projects', id));
    } catch (err) {
      console.warn("Firestore ClientProject Delete failed:", err);
    }
  };

  // --- Testimonials CRUD ---
  const addTestimonial = async (newTestimonial: Omit<Testimonial, 'id'>) => {
    const id = makeId('test');
    const testimonial: Testimonial = { ...newTestimonial, id };
    const updated = [...testimonials, testimonial];
    setTestimonials(updated);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'testimonials', id), { ...testimonial, createdAt: serverTimestamp() });
    } catch (err) {
      console.warn("Firestore Testimonial Add failed:", err);
    }
  };

  const updateTestimonial = async (updatedTestimonial: Testimonial) => {
    const updated = testimonials.map((t) => (t.id === updatedTestimonial.id ? updatedTestimonial : t));
    setTestimonials(updated);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'testimonials', updatedTestimonial.id), { ...updatedTestimonial, updatedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn("Firestore Testimonial Update failed:", err);
    }
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (err) {
      console.warn("Firestore Testimonial Delete failed:", err);
    }
  };

  // --- Contact Messages Hub ---
  const addContactMessage = async (newMessage: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const id = makeId('msg');
    const message: ContactMessage = {
      ...newMessage,
      id,
      timestamp: new Date().toLocaleString()
    };
    const updated = [message, ...messages];
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));

    // Async save to real Firebase Firestore in background
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name: newMessage.name,
        email: newMessage.email,
        subject: newMessage.subject,
        message: newMessage.message,
        timestamp: new Date().toLocaleString(),
        createdAt: serverTimestamp()
      });
      console.log("Contact ticket backed up to Firebase Firestore successfully!");
    } catch (err) {
      console.warn("Unable to write ticket to Firestore:", err);
    }
  };

  const deleteContactMessage = async (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
    } catch (err) {
      console.warn("Firestore ContactMessage Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col items-center justify-center font-sans">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <div className="absolute font-semibold text-xs tracking-widest text-[#888]">AI</div>
        </div>
        <p className="mt-4 text-[#888] animate-pulse text-sm">Preparing Premium Workspace...</p>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider
      value={{
        skills,
        projects,
        clientProjects,
        testimonials,
        messages,
        theme,
        toggleTheme,
        firestoreSyncStatus,
        firestoreError,
        // Skills
        addSkill,
        updateSkill,
        deleteSkill,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        // Client Projects
        addClientProject,
        updateClientProject,
        deleteClientProject,
        // Testimonials
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        // Messages
        addContactMessage,
        deleteContactMessage
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
