/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Laptop, RefreshCw } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

// Inline Animated Counter utilizing intersection observer
export const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = '',
  duration = 1200
}) => {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    const totalFrames = 60;
    const increment = Math.ceil(end / totalFrames);
    const intervalTime = duration / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasTriggered, value, duration]);

  return <span ref={elementRef} className="font-display font-bold tracking-tight text-white dark:text-white light:text-zinc-950 text-3xl sm:text-4xl md:text-5xl">{count}{suffix}</span>;
};

export const Experience: React.FC = () => {
  const customStats: StatItem[] = [
    { id: 'st-1', label: 'Projects Delivered', value: 24, suffix: '+' },
    { id: 'st-2', label: 'Clients Served', value: 15, suffix: '+' },
    { id: 'st-3', label: 'Automations Built', value: 35, suffix: '' },
    { id: 'st-4', label: 'AI Solutions Developed', value: 12, suffix: '+' }
  ];

  const responsibilities = [
    'Built real-world client projects translating dynamic business ideas into production apps',
    'Developed intelligence integrations incorporating LLMs, embeddings, and context retrievers',
    'Created automated systems and cron-triggered workflows to bypass manual labor operations',
    'Built custom administrative dashboards rendering responsive graphs, statistics tables, and logs',
    'Integrated third-party APIs (Stripe billing webhooks, Twilio text notifications, CRM portals)',
    'Managed multi-environment cloud deployments via platforms like Vercel and Netlify',
    'Optimized client business operations saving over 10+ operational hours weekly through automation'
  ];

  return (
    <section id="experience" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Backdrops */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="experience-heading">
          Professional Experience
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
      </div>

      {/* Stats Counter Section Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16" id="stats-counter-grid">
        {customStats.map((stat, idx) => (
          <motion.div
            id={`stat-card-${stat.id}`}
            key={stat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-2xl glass-card p-6 text-center bg-[#0f0f12]/35 dark:bg-[#0f0f12]/35 light:bg-white light:border-zinc-200"
          >
            <div className="mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Experience layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="experience-details-box">
        {/* Left Side: Role details */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glass-card p-6 md:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 sticky top-24"
          >
            <div className="flex items-center gap-3.5 mb-6">
              <span className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Briefcase className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block">Freelance Service Log</span>
                <h3 className="text-lg font-bold font-display text-white dark:text-white light:text-zinc-950">
                  Full-Stack Developer & AI Engineer
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-500 border-t border-white/5 dark:border-white/5 light:border-zinc-150 pt-5">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="text-white dark:text-white light:text-zinc-800 font-semibold">2021 – Present</span>
              </div>
              <div className="flex justify-between">
                <span>Project Scope:</span>
                <span className="text-white dark:text-white light:text-zinc-800 font-semibold">Global (Remote)</span>
              </div>
              <div className="flex justify-between">
                <span>Core Frameworks:</span>
                <span className="text-white dark:text-white light:text-zinc-800 font-semibold">React, Node, APIs</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Listed Responsibilities */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-4">
            Key Responsibilities & Deliveries
          </h3>

          <div className="space-y-4">
            {responsibilities.map((resp, idx) => (
              <motion.div
                id={`exp-item-${idx}`}
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-start gap-4 rounded-xl glass-card p-4 sm:p-5 dark:bg-[#0f0f12]/30 light:bg-white light:border-zinc-200"
              >
                <span className="flex-shrink-0 p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-zinc-700 leading-relaxed font-sans">
                  {resp}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
