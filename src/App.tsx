/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { CommandMenu } from './components/CommandMenu';
import { Hero } from './sections/Hero';
import { AboutMe } from './sections/AboutMe';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Services } from './sections/Services';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { ClientProjects } from './sections/ClientProjects';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Dashboard } from './admin/Dashboard';
import { Cpu, Moon, Sun, Sliders, Menu, X, ArrowRight, Command } from 'lucide-react';

const Header: React.FC<{ activeRoute: string; onRoute: (hash: string) => void }> = ({ activeRoute, onRoute }) => {
  const { theme, toggleTheme } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleNavClick = (hash: string) => {
    onRoute(hash);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'About', hash: '#about' },
    { label: 'Skills', hash: '#skills' },
    { label: 'Services', hash: '#services' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Case Studies', hash: '#client-case-studies' },
    { label: 'Contact', hash: '#contact' }
  ];

  const isAdminActive = activeRoute === '#admin';
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const [clickTimer, setClickTimer] = useState<any>(null);

  const handleLogoClick = () => {
    if (clickTimer) clearTimeout(clickTimer);
    
    const newCount = logoClicks + 1;
    if (newCount >= 5) {
      setLogoClicks(0);
      onRoute('#admin');
    } else {
      setLogoClicks(newCount);
      const timer = setTimeout(() => {
        setLogoClicks(0);
      }, 3000);
      setClickTimer(timer);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0c]/60 backdrop-blur-md dark:bg-black/40 light:bg-white/80 light:border-zinc-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Name Logo */}
        <div 
          onClick={() => {
            handleNavClick('#');
            handleLogoClick();
          }} 
          className="flex items-center gap-2.5 cursor-crosshair group select-none"
          id="nav-logo"
        >
          <span className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/10">
            <Cpu className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
          </span>
          <div>
            <span className="text-sm font-bold font-display text-white dark:text-white light:text-zinc-950 block tracking-tight">
              Shivakumar Kadaverugu
            </span>
            <span className="text-[9px] font-mono text-purple-400 block tracking-wider uppercase">
              Full-Stack AI Builder
            </span>
          </div>
        </div>

        {/* Desktop Anchor Linkage (Only if not in admin tab) */}
        {!isAdminActive && (
          <nav className="hidden md:flex items-center gap-6" id="nav-desktop-anchors">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.hash}
                className="text-xs font-mono font-medium text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white light:text-zinc-650 light:hover:text-purple-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Toolbar parameters */}
        <div className="flex items-center gap-3" id="nav-toolbar-controls">
          {/* Theme custom toggler */}
          <button
            id="nav-theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 dark:hover:bg-white/5 light:text-zinc-600 light:hover:bg-zinc-100 transition-all active:scale-95"
            title={theme === 'dark' ? 'Toggle Light Theme' : 'Toggle Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-purple-300" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Admin controller buttons - Only shown if active to let admin return */}
          {isAdminActive && (
            <button
              id="nav-portfolio-direct"
              onClick={() => handleNavClick('#')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#0f0f12] text-slate-300 hover:text-white border border-white/5 hover:border-white/10 active:scale-95 transition-all light:bg-zinc-100 light:text-zinc-800 light:border-zinc-200"
            >
              <span>View Portfolio</span>
            </button>
          )}

          {/* Mobile hamburger navigation (Only in standard portfolio view) */}
          {!isAdminActive && (
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 md:hidden hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer menu lists */}
      {mobileMenuOpen && !isAdminActive && (
        <div className="md:hidden border-b border-white/5 bg-zinc-950/95 light:bg-white light:border-zinc-200 px-6 py-6 space-y-4" id="nav-mobile-menu">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.hash}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono font-medium text-slate-400 hover:text-white light:text-zinc-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const PortfolioAppMain: React.FC = () => {
  const [route, setRoute] = useState<string>(window.location.hash || '#');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize route hashchanges
  useEffect(() => {
    const handleHash = () => {
      setRoute(window.location.hash || '#');
      // Scroll to top on fresh render route triggers
      if (window.location.hash === '#admin') {
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Monitor total scroll distance for page progress indicators
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setRoute(hash);
  };

  const isAdmin = route === '#admin';

  return (
    <div className="min-h-screen relative dark:bg-[#060608] light:bg-[#f9fafb] text-slate-300 dark:text-slate-350 light:text-zinc-800 transition-colors duration-300">
      
      {/* 2. Scroll Progress bar stuck at header limit */}
      {!isAdmin && (
        <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 z-100 transition-all duration-75" style={{ width: `${scrollProgress}%` }} id="scroll-progress-line"></div>
      )}

      {/* Floating Spotlight backgrounds */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-500/5 to-transparent blur-[120px] pointer-events-none"></div>

      {/* Sticky Glassmorphic Header */}
      <Header activeRoute={route} onRoute={navigateTo} />

      {/* Main Core Layout router */}
      <div id="runtime-view-wrapper">
        {isAdmin ? (
          <Dashboard onRoute={navigateTo} />
        ) : (
          <div id="public-portfolio-wrapper">
            {/* 1. PUBLIC SECTIONS COMPILATION */}
            <Hero />
            <AboutMe />
            <Education />
            <Skills />
            <Services />
            <Experience />
            <Projects />
            <ClientProjects />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        )}
      </div>

      {/* Standard Command Menu launcher (Ctrl+K) */}
      <CommandMenu onRoute={navigateTo} />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppMain />
    </PortfolioProvider>
  );
}
