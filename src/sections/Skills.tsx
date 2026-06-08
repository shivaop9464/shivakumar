/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BrainCircuit, Code, Database, Hammer, Cpu, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI & Automation', 'Frontend', 'Backend', 'Databases', 'Tools'];

  // Icons mapper for specific category pills
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI & Automation': return <BrainCircuit className="w-4 h-4" />;
      case 'Frontend': return <Code className="w-4 h-4" />;
      case 'Backend': return <Hammer className="w-4 h-4" />;
      case 'Databases': return <Database className="w-4 h-4" />;
      case 'Tools': return <Cpu className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  // Live filter skills
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Glow Effect */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="skills-heading">
          Technical Stack
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Search and inspect my expertise index. Features fully responsive filters and real percentage proficiency metrics.
        </p>
      </div>

      {/* Control center: Search and Tabs */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12" id="skills-controls">
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="skills-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. React, OpenAI, MongoDB)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 placeholder-slate-500 bg-[#0f0f12]/30 border-white/5 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all dark:bg-black/40 light:bg-zinc-100 light:border-zinc-300 light:focus:bg-white"
          />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto" id="skills-tab-list">
          {categories.map((category) => (
            <button
              id={`skills-tab-${category.replace(/\s+/g, '-').toLowerCase()}`}
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium border transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600/15 border-purple-500 text-purple-300 shadow shadow-purple-500/20'
                  : 'glass-card border-white/5 text-slate-400 hover:text-white hover:border-white/10 dark:bg-[#0f0f12]/30 light:bg-white light:border-zinc-200 light:text-zinc-600 light:hover:bg-zinc-50'
              }`}
            >
              {category !== 'All' && getCategoryIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skills list grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        id="skills-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={skill.id}
              className="rounded-xl glass-card p-5 hover:border-purple-500/35 transition-all dark:bg-[#0f0f12]/45 light:bg-white light:border-zinc-200"
              id={`skill-card-${skill.id}`}
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-bold font-display text-white dark:text-white light:text-zinc-900 tracking-tight">
                  {skill.name}
                </span>
                <span className="text-xs font-semibold font-mono text-purple-400">
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                ></motion.div>
              </div>

              {/* Category indicator pill */}
              <div className="mt-3.5 flex justify-end">
                <span className="text-[10px] font-mono font-medium text-slate-500 border border-white/5 dark:border-white/5 light:border-zinc-200 light:text-zinc-500 px-2.2 py-0.5 rounded bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-zinc-100">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty result view */}
      {filteredSkills.length === 0 && (
        <div className="py-12 text-center text-xs text-slate-500 font-mono flex flex-col items-center gap-2 border border-dashed border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-xl">
          <span>No matching skills found in category "{selectedCategory}" with query "{searchQuery}"</span>
        </div>
      )}
    </section>
  );
};
