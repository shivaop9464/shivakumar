/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor Scroll for Back-To-Top button visibility
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navs = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Case Studies', href: '#client-case-studies' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="footer" className="py-12 border-t border-white/5 dark:border-white/5 light:border-zinc-200 bg-black/40 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-xs text-slate-500 font-mono">
        
        {/* Brand details / left */}
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-md bg-purple-600/10 text-purple-400 border border-purple-500/15">
            <Cpu className="w-4 h-4" />
          </span>
          <span className="text-white dark:text-white light:text-zinc-800 font-sans font-bold">Shivakumar • AI Portfolio</span>
        </div>

        {/* Navigation list elements */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 max-w-xl">
          {navs.map((nav) => (
            <a
              key={nav.label}
              href={nav.href}
              className="hover:text-purple-400 dark:hover:text-purple-400 light:text-zinc-650 light:hover:text-purple-600 transition-colors"
            >
              {nav.label}
            </a>
          ))}
        </div>

        {/* Copyrights / Socials */}
        <div className="flex flex-col items-center md:items-end gap-2.5">
          <div className="flex items-center gap-3">
            <a href="https://github.com/shivaop9464" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" id="footer-git">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/shiva-kumar-716a0123a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" id="footer-ln">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:shivakumar8179319464@gmail.com" className="hover:text-white transition-colors" id="footer-mail">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <span className="text-[10px] opacity-70">© {new Date().getFullYear()} Shivakumar. All credentials reserved.</span>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-2.5 rounded-lg glass-card border border-white/10 dark:bg-black/80 light:bg-white light:border-zinc-300 shadow-2xl text-purple-400 hover:text-white transition-all transform hover:scale-105 active:scale-95"
          title="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
};
