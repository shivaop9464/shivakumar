/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, Hash, Cpu, Sparkles, LogIn, Command, X } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  action: () => void;
  icon: string | React.ReactNode;
}

interface CommandMenuProps {
  onRoute: (hash: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ onRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAdminSession = sessionStorage.getItem('admin_authenticated') === 'true' || window.location.hash === '#admin';

  const items: CommandItem[] = [
    {
      id: 'sc-hero',
      title: 'Top / Hero Banner',
      category: 'Section Navigation',
      action: () => { window.location.hash = ''; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-about',
      title: 'About Me summary',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'about'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-education',
      title: 'Education Timeline',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'education'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-skills',
      title: 'My Core Skills Matrix',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'skills'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-services',
      title: 'Services & Offerings',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'services'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-experience',
      title: 'Professional Experience',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'experience'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-projects',
      title: 'Featured Projects Cabinet',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'projects'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-clients',
      title: 'Client Projects Case Studies',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'client-case-studies'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-testimonials',
      title: 'What Clients Say',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'testimonials'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    },
    {
      id: 'sc-contact',
      title: 'Connect & Inquire',
      category: 'Section Navigation',
      action: () => { window.location.hash = 'contact'; setSearch(''); setIsOpen(false); },
      icon: <Hash className="w-4 h-4" />
    }
  ];

  if (isAdminSession) {
    items.push({
      id: 'go-admin',
      title: 'Access Admin Panel (CRUD Hub)',
      category: 'Management Controls',
      action: () => { onRoute('#admin'); setSearch(''); setIsOpen(false); },
      icon: <LogIn className="w-4 h-4 text-purple-400" />
    });
    items.push({
      id: 'go-portfolio',
      title: 'Return to Public Portfolio',
      category: 'Management Controls',
      action: () => { onRoute('#'); setSearch(''); setIsOpen(false); },
      icon: <Cpu className="w-4 h-4 text-blue-400" />
    });
  }

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Floating command prompt reminder */}
      <button
        id="cmd-reminder-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-full glass-card text-slate-400 hover:text-white transition-all hover:scale-105 shadow-xl border border-white/10 dark:bg-black/50 light:bg-white/80 light:text-slate-700 light:border-slate-200"
      >
        <Command className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-200 font-sans border border-slate-700">⌘</kbd>
        <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-200 font-sans border border-slate-700">K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              id="cmd-dialog"
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              onKeyDown={handleKeyDown}
              className="w-full max-w-xl rounded-xl glass-card overflow-hidden shadow-2xl relative border border-white/10 dark:bg-zinc-950/95 light:bg-white/95 light:border-zinc-200 text-slate-200 dark:text-zinc-200 light:text-zinc-800"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 dark:border-white/5 light:border-zinc-200">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  id="cmd-input"
                  type="text"
                  placeholder="Type a command or target section..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm py-1 placeholder-slate-500 font-sans dark:text-white light:text-zinc-900"
                  autoFocus
                />
                <button
                  id="cmd-close"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-2" id="cmd-results">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500/60 animate-bounce" />
                    No match for "{search}". Try searching "Admin" or "Skills"
                  </div>
                ) : (
                  Object.entries(
                    filtered.reduce((acc, current) => {
                      if (!acc[current.category]) acc[current.category] = [];
                      acc[current.category].push(current);
                      return acc;
                    }, {} as Record<string, CommandItem[]>)
                  ).map(([category, itemsList]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1.5 text-[10px] font-mono tracking-wider text-purple-400 uppercase font-bold">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {itemsList.map((item) => {
                          const originalIndex = filtered.indexOf(item);
                          const isSelected = originalIndex === selectedIndex;
                          return (
                            <div
                              id={`cmd-item-${item.id}`}
                              key={item.id}
                              onClick={item.action}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-purple-600/20 text-purple-200 dark:bg-purple-500/20 light:bg-purple-50'
                                  : 'hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-zinc-100 text-slate-300 dark:text-zinc-300 light:text-zinc-700'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`p-1.5 rounded-md ${isSelected ? 'text-purple-400' : 'text-slate-500'}`}>
                                  {item.icon}
                                </span>
                                <span className="text-xs font-medium font-sans">{item.title}</span>
                              </div>
                              {isSelected && (
                                <span className="text-[10px] bg-purple-500/30 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                                  Run Action
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 bg-zinc-900/40 dark:bg-zinc-950/40 light:bg-zinc-100/60 text-[10px] text-slate-500 dark:text-zinc-500 light:text-zinc-600 flex justify-between items-center border-t border-white/5 dark:border-white/5 light:border-zinc-200 font-mono">
                <div className="flex items-center gap-2">
                  <span>Use ↑↓ to navigate</span>
                  <span>•</span>
                  <span>↵ to execute</span>
                </div>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
