/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, Github, Star, X, LayoutGrid, Calendar, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

const ensureExternalUrl = (url: string) => {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed === '#' || trimmed === '') return '#';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [iframeNotice, setIframeNotice] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    const trimmed = url ? url.trim() : '#';
    if (trimmed === '#' || trimmed === '') {
      e.preventDefault();
      setIframeNotice("Notice: This project does not have an active live demo link or source code configured yet.");
      setTimeout(() => setIframeNotice(null), 4000);
      return;
    }

    // Since standard workspace preview frames strictly block external popups, we display a helpful non-blocking notice.
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (isIframe) {
      setIframeNotice(`ℹ️ Opening "${trimmed}"... (Note: If your browser blocks popups inside this secure editor view, please click the "Open preview" or "New Tab" button in the top-right corner to open the app standalone!)`);
      setTimeout(() => setIframeNotice(null), 8000);
    }
  };

  const categories = ['All', 'AI Applications', 'SaaS Products', 'Full-Stack Apps', 'Automation Systems'];

  // Match search parameters
  const filtered = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return (
    <section id="projects" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Visual Backdrops */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="projects-heading">
          Projects Cabinet
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          A showcase of custom tools, AI systems, and SaaS platforms. Click any product to expand details.
        </p>
      </div>

      {/* Interactive Toolbar */}
      <div className="flex flex-col gap-6 p-6 rounded-2xl glass-card mb-12 dark:bg-[#0f0f12]/30 light:bg-white light:border-zinc-200" id="projects-toolbar">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          {/* Searching */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="projects-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech stack..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 placeholder-slate-500 bg-[#0f0f12]/30 border-white/5 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all dark:bg-black/40 light:bg-zinc-100 light:border-zinc-300"
            />
          </div>

          {/* Toggle Switches */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              id="projects-featured-toggle"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium border transition-all ${
                showFeaturedOnly
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-sm'
                  : 'glass-card border-white/5 text-slate-400 hover:text-white dark:bg-[#0f0f12]/30 light:bg-white light:border-zinc-200 light:text-zinc-600'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showFeaturedOnly ? 'fill-yellow-500' : ''}`} />
              <span>{showFeaturedOnly ? 'Showing Featured' : 'Show Featured Only'}</span>
            </button>
          </div>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start" id="projects-categories-tabs">
          {categories.map((cat) => (
            <button
              id={`projects-cat-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium border transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600/15 border-purple-500 text-purple-300 shadow-sm'
                  : 'glass-card border-white/5 text-slate-400 hover:text-white dark:bg-[#0f0f12]/20 light:bg-white light:border-zinc-200 light:text-zinc-650'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="projects-product-grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="rounded-2xl glass-card overflow-hidden group cursor-pointer border-white/5 hover:border-purple-500/30 transition-all dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 flex flex-col justify-between"
              id={`project-card-${proj.id}`}
            >
              {/* Product Visual Area */}
              <div>
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    referrerPolicy="no-referrer"
                    src={proj.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Pill Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wide font-medium bg-zinc-950/80 text-purple-400 border border-purple-500/25 px-2.2 py-0.6 rounded-full uppercase">
                    {proj.category}
                  </span>

                  {proj.featured && (
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/35 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Card Title & Summs */}
                <div className="p-6">
                  <h3 className="text-lg font-bold font-display text-white dark:text-white light:text-zinc-950 group-hover:text-purple-400 transition-colors mb-2 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed mb-5 font-sans">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Badges / footer */}
              <div className="px-6 pb-6 pt-0">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-semibold bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-zinc-100 border border-white/5 dark:border-white/5 light:border-zinc-200 text-slate-400 dark:text-slate-400 light:text-zinc-650 px-2.2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="text-[10px] font-mono font-bold text-purple-400 px-1.5 py-0.5">
                      +{proj.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-xs text-purple-300 font-mono group-hover:text-purple-400 transition-colors">
                  <span>Explore parameters</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty Results panel */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-2xl">
          <span>No projects found with category "{selectedCategory}" matching "{searchQuery}"</span>
        </div>
      )}

      {/* High Fidelity Modal Details View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-1000 flex items-start justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto py-8 sm:py-16 sm:items-center">
            <motion.div
              id="project-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-2xl glass-card overflow-hidden shadow-2xl relative border border-white/10 dark:bg-zinc-950/95 light:bg-white light:border-zinc-200 text-slate-200 dark:text-zinc-200 light:text-zinc-800"
            >
              {/* Image banner */}
              <div className="relative h-64 sm:h-72 bg-zinc-950">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent"></div>
                
                {/* Close Button overlay */}
                <button
                  id="project-modal-close"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-white/10 dark:hover:bg-white/11 light:bg-white/90 text-white dark:text-white light:text-zinc-800 border-white/10 shadow-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-wide bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full uppercase mb-3 inline-block font-semibold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Info details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-2">
                    Project Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-zinc-700 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-3.5">
                    Technology Breakdown
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-semibold bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-zinc-100 border border-white/5 dark:border-white/5 light:border-zinc-200 text-purple-300 dark:text-purple-300 light:text-purple-700 px-3 py-1 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Custom extra metadata for fidelity */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 dark:border-white/5 light:border-zinc-200 py-4 text-xs font-mono text-slate-500">
                  <div className="flex flex-col gap-1">
                    <span>Host Architecture</span>
                    <span className="text-white dark:text-white light:text-zinc-800 font-semibold font-sans">Client-Led Standalone / Vercel SPA</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>Authentication Concepts</span>
                    <span className="text-white dark:text-white light:text-zinc-800 font-semibold font-sans">Secure Token State Handling</span>
                  </div>
                </div>

                {/* Redirect Anchors */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4">
                    <a
                      href={ensureExternalUrl(selectedProject.liveUrl)}
                      onClick={(e) => handleLinkClick(e, selectedProject.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold shadow-md transition-all transform active:translate-y-0.5 ${
                        selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '' && selectedProject.liveUrl.trim() !== '#'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold'
                          : 'bg-zinc-900 border border-white/5 text-slate-500 cursor-not-allowed opacity-70'
                      }`}
                      id="project-modal-live-link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>
                        {selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '' && selectedProject.liveUrl.trim() !== '#'
                          ? 'View Launch Site'
                          : 'Live Demo Offline'}
                      </span>
                    </a>
                    <a
                      href={ensureExternalUrl(selectedProject.githubUrl)}
                      onClick={(e) => handleLinkClick(e, selectedProject.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-xs font-semibold shadow-md transition-all transform active:translate-y-0.5 ${
                        selectedProject.githubUrl && selectedProject.githubUrl.trim() !== '' && selectedProject.githubUrl.trim() !== '#'
                          ? 'glass-card text-white hover:bg-white/5 dark:text-white light:bg-white/90 light:text-zinc-800 light:border-zinc-200 bg-zinc-900 border-white/10'
                          : 'bg-zinc-900 border-white/5 text-slate-500 cursor-not-allowed opacity-70'
                      }`}
                      id="project-modal-git-link"
                    >
                      <Github className="w-4 h-4" />
                      <span>
                        {selectedProject.githubUrl && selectedProject.githubUrl.trim() !== '' && selectedProject.githubUrl.trim() !== '#'
                          ? 'Browse Source Code'
                          : 'Private Repository'}
                      </span>
                    </a>
                  </div>

                  {iframeNotice && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: 5 }}
                      className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/15 text-purple-300 text-[11px] font-mono leading-relaxed"
                      id="project-redirect-notice"
                    >
                      {iframeNotice}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
