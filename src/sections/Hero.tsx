/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles, Terminal, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const techTerms = [
    'Generative AI Integrations',
    'Custom Agentic Workflows',
    'Full-Stack Web Architectures',
    'Enterprise Automations',
    'Retrieval-Augmented Generation (RAG)'
  ];
  
  const [termIndex, setTermIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple, robust typing state machine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTerm = techTerms[termIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypedText((prev) => currentTerm.slice(0, prev.length + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
    }

    if (!isDeleting && typedText === currentTerm) {
      // Pause at full term
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setTermIndex((prev) => (prev + 1) % techTerms.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, termIndex]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4">
      {/* 1. Animated Tech-Gradients / Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-float-slow pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-[90px] animate-float-medium pointer-events-none"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          id="hero-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card text-xs font-medium text-purple-300 border border-purple-500/25 mb-8 hover:border-purple-500/40 transition-colors cursor-pointer dark:bg-black/40 light:bg-purple-50/90 light:text-purple-700 light:border-purple-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Freelance & Client Projects</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 max-w-4xl leading-[1.1] mb-6"
        >
          Full-Stack{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
            AI Engineer
          </span>{' '}
          <br className="hidden sm:block" />
          & Product Builder
        </motion.h1>

        {/* Dynamic Typing Term */}
        <motion.div
          id="hero-typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-8 mb-6 flex items-center gap-2 font-mono text-sm sm:text-base md:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600"
        >
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>Specializing in:</span>
          <span className="text-white dark:text-white light:text-purple-600 font-semibold underline decoration-purple-500 bg-white/5 dark:bg-white/5 light:bg-purple-50 px-2 py-0.5 rounded">
            {typedText}
          </span>
          <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse"></span>
        </motion.div>

        {/* Subheadline & Description */}
        <motion.p
          id="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mb-10 leading-relaxed font-sans"
        >
          Building AI-powered applications, robust automations, and scalable digital products that solve real-world business problems. Let's turn your specs into software.
        </motion.p>

        {/* Action Controls */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 w-full justify-center px-4 max-w-md sm:max-w-none"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg glass-card text-white hover:bg-white/5 dark:text-white light:bg-white/90 light:text-zinc-800 light:border-zinc-200 light:hover:bg-zinc-50 border border-white/10 dark:hover:border-white/20 font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <span>Hire Me</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </a>
        </motion.div>

        {/* Location & Links */}
        <motion.div
          id="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-500 light:text-slate-500 border-t border-white/5 dark:border-white/5 light:border-zinc-200 pt-8 w-full"
        >
          {/* Location details */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>Hyderabad, TS, India</span>
          </div>

          <span className="hidden sm:inline text-white/10 dark:text-white/10 light:text-zinc-300">|</span>

          {/* Contact and Anchor icons */}
          <div className="flex items-center gap-4.5">
            <a
              href="https://github.com/shivaop9464"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center gap-1"
              id="hero-git-link"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shiva-kumar-716a0123a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
              id="hero-ln-link"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:shivakumar8179319464@gmail.com"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              id="hero-mail-link"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
