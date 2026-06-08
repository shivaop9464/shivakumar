/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Bookmark,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  Database,
  Trash2,
  Edit2,
  PlusCircle,
  X,
  FileCheck,
  Code,
  Mail,
  Undo2,
  Check,
  Sliders,
  Star,
  Lock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill, Project, ClientProject, Testimonial } from '../types';

export const Dashboard: React.FC<{ onRoute: (hash: string) => void }> = ({ onRoute }) => {
  const {
    skills, addSkill, updateSkill, deleteSkill,
    projects, addProject, updateProject, deleteProject,
    clientProjects, addClientProject, updateClientProject, deleteClientProject,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    messages, deleteContactMessage,
    firestoreSyncStatus, firestoreError
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects' | 'case-studies' | 'testimonials' | 'messages'>('overview');

  // --- Secure Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginErrorState, setLoginErrorState] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'Shivakumar' && passwordInput === 'ssshivaop123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginErrorState('');
    } else {
      setLoginErrorState('Invalid administrator credentials. Authentication failed.');
    }
  };

  // --- Modal Form States ---
  const [editingItemID, setEditingItemID] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'skill' | 'project' | 'case' | 'testimonial' | null>(null);

  // --- Skills Form Fields ---
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('Frontend');
  const [skillPercentage, setSkillPercentage] = useState(85);

  // --- Projects Form Fields ---
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projCategory, setProjCategory] = useState('AI Applications');
  const [projTech, setProjTech] = useState(''); // Comma-separated on input
  const [projImage, setProjImage] = useState('');
  const [projLive, setProjLive] = useState('#');
  const [projGit, setProjGit] = useState('https://github.com');
  const [projFeatured, setProjFeatured] = useState(false);

  // --- Case Studies Form Fields ---
  const [caseClient, setCaseClient] = useState('');
  const [caseIndustry, setCaseIndustry] = useState('');
  const [caseProblem, setCaseProblem] = useState('');
  const [caseSolution, setCaseSolution] = useState('');
  const [caseTech, setCaseTech] = useState(''); // Comma-separated on input
  const [caseResults, setCaseResults] = useState('');
  const [caseScreenshot, setCaseScreenshot] = useState('');

  // --- Testimonials Form Fields ---
  const [testClient, setTestClient] = useState('');
  const [testPosition, setTestPosition] = useState('');
  const [testCompany, setTestCompany] = useState('');
  const [testReview, setTestReview] = useState('');
  const [testPhoto, setTestPhoto] = useState('');

  // --- Form Reset Helpers ---
  const resetFormStates = () => {
    setEditingItemID(null);
    setModalType(null);

    // Reset Skills
    setSkillName('');
    setSkillCategory('Frontend');
    setSkillPercentage(85);

    // Reset Projects
    setProjTitle('');
    setProjDesc('');
    setProjCategory('AI Applications');
    setProjTech('');
    setProjImage('');
    setProjLive('#');
    setProjGit('https://github.com');
    setProjFeatured(false);

    // Reset Case Studies
    setCaseClient('');
    setCaseIndustry('');
    setCaseProblem('');
    setCaseSolution('');
    setCaseTech('');
    setCaseResults('');
    setCaseScreenshot('');

    // Reset Testimonials
    setTestClient('');
    setTestPosition('');
    setTestCompany('');
    setTestReview('');
    setTestPhoto('');
  };

  // --- Handle CRUD Trigger Click ---
  const handleEditSkill = (item: Skill) => {
    setEditingItemID(item.id);
    setModalType('skill');
    setSkillName(item.name);
    setSkillCategory(item.category);
    setSkillPercentage(item.percentage);
  };

  const handleEditProject = (item: Project) => {
    setEditingItemID(item.id);
    setModalType('project');
    setProjTitle(item.title);
    setProjDesc(item.description);
    setProjCategory(item.category);
    setProjTech(item.technologies.join(', '));
    setProjImage(item.imageUrl);
    setProjLive(item.liveUrl);
    setProjGit(item.githubUrl);
    setProjFeatured(item.featured);
  };

  const handleEditCase = (item: ClientProject) => {
    setEditingItemID(item.id);
    setModalType('case');
    setCaseClient(item.clientName);
    setCaseIndustry(item.industry);
    setCaseProblem(item.problem);
    setCaseSolution(item.solution);
    setCaseTech(item.technologies.join(', '));
    setCaseResults(item.results);
    setCaseScreenshot(item.screenshotUrl);
  };

  const handleEditTestimonial = (item: Testimonial) => {
    setEditingItemID(item.id);
    setModalType('testimonial');
    setTestClient(item.clientName);
    setTestPosition(item.position);
    setTestCompany(item.company);
    setTestReview(item.review);
    setTestPhoto(item.photoUrl);
  };

  // --- Submit Actions ---
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const payload: Skill = {
      id: editingItemID || '',
      name: skillName,
      category: skillCategory,
      percentage: Number(skillPercentage)
    };

    if (editingItemID) {
      updateSkill(payload);
    } else {
      addSkill(payload);
    }
    resetFormStates();
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    const techArray = projTech.split(',').map((t) => t.trim()).filter(Boolean);
    const payload: Project = {
      id: editingItemID || '',
      title: projTitle,
      description: projDesc,
      category: projCategory,
      technologies: techArray,
      imageUrl: projImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      liveUrl: projLive,
      githubUrl: projGit,
      featured: projFeatured
    };

    if (editingItemID) {
      updateProject(payload);
    } else {
      addProject(payload);
    }
    resetFormStates();
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseClient.trim()) return;

    const techArray = caseTech.split(',').map((t) => t.trim()).filter(Boolean);
    const payload: ClientProject = {
      id: editingItemID || '',
      clientName: caseClient,
      industry: caseIndustry,
      problem: caseProblem,
      solution: caseSolution,
      technologies: techArray,
      results: caseResults,
      screenshotUrl: caseScreenshot || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80'
    };

    if (editingItemID) {
      updateClientProject(payload);
    } else {
      addClientProject(payload);
    }
    resetFormStates();
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testClient.trim()) return;

    const payload: Testimonial = {
      id: editingItemID || '',
      clientName: testClient,
      position: testPosition,
      company: testCompany,
      review: testReview,
      photoUrl: testPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    };

    if (editingItemID) {
      updateTestimonial(payload);
    } else {
      addTestimonial(payload);
    }
    resetFormStates();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070a] text-slate-200 font-sans relative flex items-center justify-center p-6 pb-20">
        {/* Lights decorations */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Grid line backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md p-8 rounded-2xl glass-card border border-white/5 bg-[#0e0e12]/85 backdrop-blur-xl relative z-10 shadow-2xl space-y-6"
          id="admin-login-card"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold font-display text-white tracking-tight">Identity Verification</h2>
            <p className="text-xs text-slate-400 font-sans max-w-[280px] mx-auto leading-relaxed">
              Authenticate using security credentials to access administrative dashboard operations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginErrorState && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 text-[11px] font-mono rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 leading-relaxed"
                id="login-error-message"
              >
                ⚠ {loginErrorState}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-username" className="block text-[11px] font-mono tracking-wider font-bold text-slate-400 uppercase">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                required
                placeholder="Manager User ID"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-white bg-slate-950/65 rounded-lg border border-white/5 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/10 outline-none transition-all placeholder:text-slate-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-[11px] font-mono tracking-wider font-bold text-slate-400 uppercase">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                placeholder="Access Secret Code"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-white bg-slate-950/65 rounded-lg border border-white/5 focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/10 outline-none transition-all placeholder:text-slate-600 font-mono"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                id="login-cancel"
                type="button"
                onClick={() => onRoute('#')}
                className="w-full sm:w-1/3 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-mono font-bold bg-[#141418] text-slate-400 hover:text-white border border-white/5 hover:border-white/10 active:scale-95 transition-all"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                id="login-submit"
                type="submit"
                className="w-full sm:w-2/3 py-2.5 rounded-lg text-xs font-mono font-bold bg-purple-600 hover:bg-purple-550 text-purple-100 shadow-md shadow-purple-600/15 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Authorize Node</span>
              </button>
            </div>
          </form>

          {/* Prompt */}
          <div className="text-center pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
            Secure administrative link. Unauthorized activity logged.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-200 font-sans relative pb-20">
      {/* Lights decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[110px] pointer-events-none"></div>

      {/* Grid line backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-purple-505/10 text-purple-400 border border-purple-550/20 bg-purple-500/10">
              <Cpu className="w-5 h-5 animate-spin" />
            </span>
            <div>
              <h1 className="text-sm font-bold font-display text-white">Central Operations</h1>
              <p className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Session Active</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-logout-btn"
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('admin_authenticated');
                onRoute('#');
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-rose-950/20 text-rose-300 hover:text-white border border-rose-500/10 hover:border-rose-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Sign Out</span>
            </button>

            <button
              id="admin-return-btn"
              onClick={() => onRoute('#')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#0f0f12] text-slate-300 hover:text-white border border-white/5 hover:border-white/10 hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Return Portfolio</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10" id="admin-main-grid">
        
        {/* Left Side menu navigation (Span 3) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-4 rounded-xl bg-[#0f0f12]/30 border border-white/5 mb-4 text-xs font-mono text-slate-500">
            <span>Logged Email:</span>
            <span className="block font-sans font-bold text-white mt-1">shivakumar...</span>
          </div>

          <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0" id="admin-sidebar-nav">
            <button
              id="admin-tab-btn-overview"
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Overview CRM</span>
            </button>
            <button
              id="admin-tab-btn-skills"
              onClick={() => setActiveTab('skills')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 transition-colors ${
                activeTab === 'skills'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Skills Catalog</span>
            </button>
            <button
              id="admin-tab-btn-projects"
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 transition-colors ${
                activeTab === 'projects'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Projects Cabinet</span>
            </button>
            <button
              id="admin-tab-btn-case-studies"
              onClick={() => setActiveTab('case-studies')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 transition-colors ${
                activeTab === 'case-studies'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Case Studies</span>
            </button>
            <button
              id="admin-tab-btn-testimonials"
              onClick={() => setActiveTab('testimonials')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Testimonials</span>
            </button>
            <button
              id="admin-tab-btn-messages"
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium font-mono flex items-center gap-3 justify-between transition-colors ${
                activeTab === 'messages'
                  ? 'bg-purple-600/15 border border-purple-500 text-purple-300'
                  : 'hover:bg-white/5 hover:text-white text-slate-400 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Inbox Messages</span>
              </div>
              {messages.length > 0 && (
                <span className="text-[9px] bg-purple-500 text-white font-bold px-1.5 py-0.5 rounded-full font-sans">
                  {messages.length}
                </span>
              )}
            </button>
          </nav>
        </aside>

        {/* Right Side Working Content workspace (Span 9) */}
        <section className="lg:col-span-9" id="admin-workspace">
          
          {/* TAB 1: OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-6" id="admin-tab-overview">
              <h2 className="text-xl font-bold font-display text-white">System Metrics Analytics</h2>

              {/* Counts boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl glass-card border-white/5">
                  <span className="text-2xl font-bold font-display text-white">{skills.length}</span>
                  <p className="text-xs text-slate-500 font-mono mt-1">Total Skills Cataloged</p>
                </div>
                <div className="p-6 rounded-2xl glass-card border-white/5">
                  <span className="text-2xl font-bold font-display text-white">{projects.length}</span>
                  <p className="text-xs text-slate-500 font-mono mt-1">Total Main Projects</p>
                </div>
                <div className="p-6 rounded-2xl glass-card border-white/5">
                  <span className="text-2xl font-bold font-display text-white">{clientProjects.length}</span>
                  <p className="text-xs text-slate-500 font-mono mt-1">Client Case Studies</p>
                </div>
                <div className="p-6 rounded-2xl glass-card border-white/5">
                  <span className="text-2xl font-bold font-display text-white">{testimonials.length}</span>
                  <p className="text-xs text-slate-500 font-mono mt-1">Client Reviews</p>
                </div>
              </div>

              {/* Dynamic Database Sync & Connections Diagnostics Inspector */}
              <div className="p-6 rounded-2xl glass-card border-white/5 bg-[#0e0e11] space-y-4 font-mono">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-2">
                    <Database className={`w-4 h-4 ${
                      firestoreSyncStatus === 'connected' ? 'text-emerald-400' :
                      firestoreSyncStatus === 'syncing' ? 'text-amber-400 animate-pulse' : 'text-rose-400'
                    }`} />
                    <h3 className="font-sans font-bold text-white text-sm">Google Firebase Integration Status</h3>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    firestoreSyncStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    firestoreSyncStatus === 'syncing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {firestoreSyncStatus}
                  </span>
                </div>

                {firestoreSyncStatus === 'connected' && (
                  <div className="text-xs text-slate-400 space-y-2">
                    <p className="text-emerald-300">✓ Your workspace is successfully connected & synchronized with your real Google Firestore database!</p>
                    <p>Every CRUD action (adding skills, publishing projects, and logging testimonials) updates your remote Firestore collections under project <code className="text-purple-300 px-1 rounded bg-white/5">swiftserve-rider</code> instantly while maintaining local storage as a hyper-fast offline cache layer.</p>
                  </div>
                )}

                {firestoreSyncStatus === 'syncing' && (
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="animate-pulse">Initialing transaction channels with Firestore endpoint...</p>
                    <p className="text-[10px] text-slate-500">Checking remote schema tables matching 'skills', 'projects', and 'contact_messages'...</p>
                  </div>
                )}

                {firestoreSyncStatus === 'error' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/15 text-rose-300 text-xs space-y-2">
                      <p className="font-bold flex items-center gap-2 text-rose-450">
                        <span>⚠ Sync Alert: Firestore reads/writes are blocked by your Firebase security rules.</span>
                      </p>
                      <p className="font-sans text-[11px] leading-relaxed">
                        <strong>SDK Error detail:</strong> <code className="bg-black/40 px-1.5 py-0.5 rounded text-rose-200 text-mono text-xs">{firestoreError || "permission-denied"}</code>
                      </p>
                      <p className="font-sans text-slate-400 leading-relaxed">
                        To protect your database, Firebase Firestore initiates in <strong>Production Mode</strong> by default, which blocks all public access. The portfolio app is fallback-running on your sandbox <code className="text-slate-200">localStorage</code> perfectly, but writes are not yet saving to your remote Firebase panel.
                      </p>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <h4 className="font-sans font-bold text-white text-xs">How to fix this in 30 seconds:</h4>
                      <ol className="list-decimal pl-4 space-y-2 text-slate-400">
                        <li>
                          Open your Google Firebase Console: <a href="https://console.firebase.google.com/project/swiftserve-rider/firestore" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">console.firebase.google.com/project/swiftserve-rider/firestore</a>
                        </li>
                        <li>
                          Click the <strong className="text-slate-200">"Rules"</strong> tab at the top.
                        </li>
                        <li>
                          Replace the code panel with these open development guidelines, then click <strong className="text-emerald-400">"Publish"</strong>:
                        </li>
                      </ol>

                      <div className="relative mt-2">
                        <pre className="p-3 text-[10px] bg-slate-950 rounded-lg overflow-x-auto text-slate-300 border border-white/5 font-mono select-all">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /skills/{document} {
      allow read, write: if true;
    }
    match /projects/{document} {
      allow read, write: if true;
    }
    match /client_projects/{document} {
      allow read, write: if true;
    }
    match /testimonials/{document} {
      allow read, write: if true;
    }
    match /contact_messages/{document} {
      allow read, write: if true;
    }
  }
}`}
                        </pre>
                        <p className="text-[9px] text-slate-500 mt-1 italic">Note: These development rules allow public reads/writes so your portfolio can sync instantly. For production, you can restrict writing to your authenticated admin user account.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS CATALOG */}
          {activeTab === 'skills' && (
            <div className="space-y-6" id="admin-tab-skills">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-display text-white">Manage Skills</h2>
                <button
                  id="admin-add-skill-trigger"
                  onClick={() => { resetFormStates(); setModalType('skill'); }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 hover:bg-purple-505 text-white shadow-sm hover:shadow active:scale-95 transition-all text-purple-100"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Skill</span>
                </button>
              </div>

              {/* Table listings */}
              <div className="rounded-xl glass-card overflow-hidden border-white/5 bg-[#0f0f12]/30">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 font-mono uppercase bg-zinc-900/40">
                      <th className="p-4">Skill Name</th>
                      <th className="p-4">Category Category</th>
                      <th className="p-4">Proficiency</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {skills.map((skill) => (
                      <tr key={skill.id} className="hover:bg-white/2" id={`admin-skill-row-${skill.id}`}>
                        <td className="p-4 font-bold text-white">{skill.name}</td>
                        <td className="p-4 font-mono text-slate-400">{skill.category}</td>
                        <td className="p-4 font-mono text-purple-400">{skill.percentage}%</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            id={`admin-edit-skill-${skill.id}`}
                            onClick={() => handleEditSkill(skill)}
                            className="p-1.5 rounded bg-zinc-900 border border-white/5 text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`admin-delete-skill-${skill.id}`}
                            onClick={() => deleteSkill(skill.id)}
                            className="p-1.5 rounded bg-red-950/20 border border-red-500/10 text-red-400 hover:bg-red-950/45"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS CATALOG */}
          {activeTab === 'projects' && (
            <div className="space-y-6" id="admin-tab-projects">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-display text-white">Manage Cabinet Projects</h2>
                <button
                  id="admin-add-proj-trigger"
                  onClick={() => { resetFormStates(); setModalType('project'); }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 hover:bg-purple-505 text-white active:scale-95 transition-all text-purple-100"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="admin-projects-list">
                {projects.map((proj) => (
                  <div
                    id={`admin-proj-card-${proj.id}`}
                    key={proj.id}
                    className="p-5 rounded-2xl glass-card border-white/5 bg-[#0f0f12]/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-sm font-bold text-white font-display line-clamp-1">{proj.title}</h3>
                        <div className="flex gap-1">
                          <button
                            id={`admin-edit-proj-${proj.id}`}
                            onClick={() => handleEditProject(proj)}
                            className="p-1.5 rounded bg-zinc-900 border border-white/5 text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`admin-delete-proj-${proj.id}`}
                            onClick={() => deleteProject(proj.id)}
                            className="p-1.5 rounded bg-red-900/15 text-red-400 hover:bg-red-900/25"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[9px] font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-slate-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>{proj.category}</span>
                      {proj.featured && (
                        <span className="text-yellow-500 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CASE STUDIES */}
          {activeTab === 'case-studies' && (
            <div className="space-y-6" id="admin-tab-case-studies">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-display text-white">Manage Client Case Studies</h2>
                <button
                  id="admin-add-case-trigger"
                  onClick={() => { resetFormStates(); setModalType('case'); }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 hover:bg-purple-505 text-white active:scale-95 transition-all text-purple-100"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Case Study</span>
                </button>
              </div>

              <div className="space-y-4" id="admin-cases-list">
                {clientProjects.map((cs) => (
                  <div
                    id={`admin-case-card-${cs.id}`}
                    key={cs.id}
                    className="p-6 rounded-2xl glass-card border-white/5 bg-[#0f0f12]/30 flex flex-col md:flex-row justify-between md:items-center gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{cs.industry}</span>
                      <h3 className="text-sm font-bold text-white font-display mt-0.5">{cs.clientName}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 max-w-xl line-clamp-2 leading-relaxed">
                        <strong>Problem:</strong> {cs.problem}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <button
                        id={`admin-edit-case-${cs.id}`}
                        onClick={() => handleEditCase(cs)}
                        className="px-3 py-1.5 rounded bg-zinc-900 border border-white/5 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        id={`admin-delete-case-${cs.id}`}
                        onClick={() => deleteClientProject(cs.id)}
                        className="px-3 py-1.5 rounded bg-red-950/20 border border-red-500/10 text-xs font-mono text-red-400 hover:bg-red-950/45 flex items-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6" id="admin-tab-testimonials">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-display text-white">Manage Client Reviews</h2>
                <button
                  id="admin-add-testimonial-trigger"
                  onClick={() => { resetFormStates(); setModalType('testimonial'); }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 hover:bg-purple-505 text-white active:scale-95 transition-all text-purple-100"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="admin-testimonials-list">
                {testimonials.map((t) => (
                  <div
                    id={`admin-test-card-${t.id}`}
                    key={t.id}
                    className="p-5 rounded-2xl glass-card border-white/5 bg-[#0f0f12]/30 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs text-slate-400 italic line-clamp-3 mb-4 font-sans leading-relaxed">
                        "{t.review}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{t.clientName}</h4>
                        <p className="text-[10px] font-mono text-slate-500">{t.position}, {t.company}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          id={`admin-edit-test-${t.id}`}
                          onClick={() => handleEditTestimonial(t)}
                          className="p-1.5 rounded bg-zinc-900 border border-white/5 text-slate-400 hover:text-white"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          id={`admin-delete-test-${t.id}`}
                          onClick={() => deleteTestimonial(t.id)}
                          className="p-1.5 rounded bg-red-900/15 text-red-400 hover:bg-red-900/25"
                        >
                          <Trash2 className="w-3 h-3" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INBOX MESSAGES WORKSPACE */}
          {activeTab === 'messages' && (
            <div className="space-y-6" id="admin-tab-messages">
              <h2 className="text-lg font-bold font-display text-white">Inbox CRM Messages Submitted</h2>

              <div className="space-y-4" id="admin-messages-list">
                {messages.length === 0 ? (
                  <div className="py-16 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-800 rounded-2xl">
                    <Mail className="w-7 h-7 text-slate-600 animate-bounce" />
                    <span>Your mailbox is currently vacant. Send an inquiry via the public form to populate logs!</span>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      id={`admin-msg-card-${msg.id}`}
                      key={msg.id}
                      className="p-6 rounded-2xl glass-card border-white/5 bg-[#0f0f12]/30 space-y-4 relative"
                    >
                      <button
                        id={`admin-delete-msg-${msg.id}`}
                        onClick={() => deleteContactMessage(msg.id)}
                        className="absolute top-4 right-4 p-2 rounded bg-red-950/20 text-red-400 hover:bg-red-950/45 border border-red-500/10 transition-colors"
                        title="Delete ticket archive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/10 text-purple-400 border border-purple-500/25 rounded-lg text-xs font-mono font-bold">
                          Inquiry
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white font-sans">{msg.subject}</h3>
                          <p className="text-[10px] font-mono text-slate-500 mt-1">
                            From: <span className="text-slate-300 font-semibold">{msg.name}</span> ({msg.email}) | Time: {msg.timestamp}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-[#0a0a0c]/80 rounded-xl border border-white/5 text-xs text-slate-300 font-sans leading-relaxed">
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* --- CRUD MODALS MANAGER (SKILLS / PROJECTS / CASES / TESTIMONIALS) --- */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              id="admin-crud-modal"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-2xl glass-card overflow-hidden shadow-2xl relative border border-white/10 bg-zinc-950"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-base font-bold font-display text-white">
                  {editingItemID ? 'Edit Record' : 'Create New Record'}: {modalType.toUpperCase()}
                </h3>
                <button
                  id="admin-crud-modal-close"
                  onClick={resetFormStates}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form dispatchers */}
              <div className="p-6">
                
                {/* SKILLS MODAL FORM */}
                {modalType === 'skill' && (
                  <form onSubmit={handleSaveSkill} className="space-y-5" id="admin-skill-form">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Skill Name</label>
                      <input
                        id="admin-fields-skill-name"
                        type="text"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        placeholder="e.g. Next.js, LangChain"
                        className="w-full px-3.5 py-2 rounded-lg glass-card text-xs font-medium text-white bg-black/35 border-white/5 outline-none focus:border-purple-500/40"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-500">Category Category</label>
                      <select
                        id="admin-fields-skill-category"
                        value={skillCategory}
                        onChange={(e) => setSkillCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg glass-card text-xs font-medium text-white bg-zinc-900 border-white/5 outline-none focus:border-purple-500/40"
                      >
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Databases">Databases</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-mono font-medium text-slate-500">
                        <span>Proficiency Percentage</span>
                        <span className="text-purple-400 font-bold">{skillPercentage}%</span>
                      </div>
                      <input
                        id="admin-fields-skill-percentage"
                        type="range"
                        min="20"
                        max="100"
                        value={skillPercentage}
                        onChange={(e) => setSkillPercentage(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    <button
                      id="admin-submit-skill-btn"
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs shadow"
                    >
                      Save Parameters
                    </button>
                  </form>
                )}

                {/* PROJECTS MODAL FORM */}
                {modalType === 'project' && (
                  <form onSubmit={handleSaveProject} className="space-y-4" id="admin-proj-form">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Project Title</label>
                      <input
                        id="admin-fields-proj-title"
                        type="text"
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. CognitiveDesk Helper"
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5 outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Description</label>
                      <textarea
                        id="admin-fields-proj-desc"
                        rows={3}
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                        placeholder="Short summary of code features..."
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5 outline-none focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Category Category</label>
                        <select
                          id="admin-fields-proj-category"
                          value={projCategory}
                          onChange={(e) => setProjCategory(e.target.value)}
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900 border-white/5 outline-none"
                        >
                          <option value="AI Applications">AI Applications</option>
                          <option value="SaaS Products">SaaS Products</option>
                          <option value="Full-Stack Apps">Full-Stack Apps</option>
                          <option value="Automation Systems">Automation Systems</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Technologies (comma list)</label>
                        <input
                          id="admin-fields-proj-tech"
                          type="text"
                          value={projTech}
                          onChange={(e) => setProjTech(e.target.value)}
                          placeholder="React, Gemini, n8n"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Mock Image URL</label>
                      <input
                        id="admin-fields-proj-img"
                        type="text"
                        value={projImage}
                        onChange={(e) => setProjImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Live Server URL</label>
                        <input
                          id="admin-fields-proj-live"
                          type="text"
                          value={projLive}
                          onChange={(e) => setProjLive(e.target.value)}
                          placeholder="#"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900/60"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">GitHub Code URL</label>
                        <input
                          id="admin-fields-proj-git"
                          type="text"
                          value={projGit}
                          onChange={(e) => setProjGit(e.target.value)}
                          placeholder="https://github.com..."
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900/60"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 py-2">
                      <input
                        id="admin-fields-proj-featured"
                        type="checkbox"
                        checked={projFeatured}
                        onChange={(e) => setProjFeatured(e.target.checked)}
                        className="h-4 w-4 rounded bg-zinc-900 border-white/5 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="admin-fields-proj-featured" className="text-xs font-sans text-slate-300">
                        Highlight as Featured Project on Portfolio Home
                      </label>
                    </div>

                    <button
                      id="admin-submit-proj-btn"
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs shadow"
                    >
                      Save Parameters
                    </button>
                  </form>
                )}

                {/* CASE STUDIES MODAL FORM */}
                {modalType === 'case' && (
                  <form onSubmit={handleSaveCase} className="space-y-4" id="admin-case-form">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Client Name</label>
                        <input
                          id="admin-fields-case-client"
                          type="text"
                          value={caseClient}
                          onChange={(e) => setCaseClient(e.target.value)}
                          placeholder="e.g. NestaMed"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Industry Sector</label>
                        <input
                          id="admin-fields-case-industry"
                          type="text"
                          value={caseIndustry}
                          onChange={(e) => setCaseIndustry(e.target.value)}
                          placeholder="e.g. Healthcare, Finance"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 font-bold text-red-400">Business Problem Faced</label>
                      <textarea
                        id="admin-fields-case-problem"
                        rows={2}
                        value={caseProblem}
                        onChange={(e) => setCaseProblem(e.target.value)}
                        placeholder="What bottleneck was resolved? (max 2 lines)"
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-slate-300 bg-zinc-900 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 font-bold text-purple-400">Solution Provided</label>
                      <textarea
                        id="admin-fields-case-solution"
                        rows={2}
                        value={caseSolution}
                        onChange={(e) => setCaseSolution(e.target.value)}
                        placeholder="What systems did you design? (max 2 lines)"
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-slate-300 bg-zinc-900 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 font-bold text-emerald-400">Results Achieved</label>
                      <input
                        id="admin-fields-case-results"
                        type="text"
                        value={caseResults}
                        onChange={(e) => setCaseResults(e.target.value)}
                        placeholder="e.g. Reduced record indexing times by 84%"
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35 border-white/5"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Technologies (comma list)</label>
                        <input
                          id="admin-fields-case-tech"
                          type="text"
                          value={caseTech}
                          onChange={(e) => setCaseTech(e.target.value)}
                          placeholder="TypeScript, Express, n8n"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Screenshot Photo URL</label>
                        <input
                          id="admin-fields-case-img"
                          type="text"
                          value={caseScreenshot}
                          onChange={(e) => setCaseScreenshot(e.target.value)}
                          placeholder="https://images.unsplash.com..."
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900"
                        />
                      </div>
                    </div>

                    <button
                      id="admin-submit-case-btn"
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs shadow"
                    >
                      Save Case Study Parameters
                    </button>
                  </form>
                )}

                {/* TESTIMONIALS MODAL FORM */}
                {modalType === 'testimonial' && (
                  <form onSubmit={handleSaveTestimonial} className="space-y-4" id="admin-testimonial-form">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500 font-bold">Client Name / Author</label>
                      <input
                        id="admin-fields-test-name"
                        type="text"
                        value={testClient}
                        onChange={(e) => setTestClient(e.target.value)}
                        placeholder="e.g. Sarah Albright"
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-black/35"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Client Position</label>
                        <input
                          id="admin-fields-test-position"
                          type="text"
                          value={testPosition}
                          onChange={(e) => setTestPosition(e.target.value)}
                          placeholder="Founder, Chief Developer"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-medium text-slate-500">Company Name</label>
                        <input
                          id="admin-fields-test-company"
                          type="text"
                          value={testCompany}
                          onChange={(e) => setTestCompany(e.target.value)}
                          placeholder="NestaMed Care"
                          className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Review Quote Content</label>
                      <textarea
                        id="admin-fields-test-review"
                        rows={3}
                        value={testReview}
                        onChange={(e) => setTestReview(e.target.value)}
                        placeholder="Write feedback review content here..."
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-slate-300 bg-zinc-900 resize-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-medium text-slate-500">Client Photo Link</label>
                      <input
                        id="admin-fields-test-img"
                        type="text"
                        value={testPhoto}
                        onChange={(e) => setTestPhoto(e.target.value)}
                        className="w-full px-3.5 py-1.8 rounded-lg glass-card text-xs text-white bg-zinc-900"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <button
                      id="admin-submit-test-btn"
                      type="submit"
                      className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs shadow"
                    >
                      Save Parameters
                    </button>
                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
