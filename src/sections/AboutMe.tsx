/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Code2, BrainCircuit, Cloud, Zap, Cpu, Link, Briefcase, Award, GraduationCap } from 'lucide-react';

interface FocusCard {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export const AboutMe: React.FC = () => {
  const focuses: FocusCard[] = [
    {
      title: 'Full-Stack Development',
      desc: 'Formulating end-to-end architectures in TypeScript, starting from performant React / Next.js frontends to modular server APIs.',
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-600/10 to-blue-500/5'
    },
    {
      title: 'AI Applications',
      desc: 'Integrating intelligence utilizing OpenAI/Gemini models, customized prompt topologies, context-aware embeddings, and multi-agent frameworks.',
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-600/10 to-purple-500/5'
    },
    {
      title: 'SaaS Products',
      desc: 'Designing modular subscription pipelines, webhooks, recurring telemetry graphs, and user access models.',
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-600/10 to-cyan-500/5'
    },
    {
      title: 'Workflow Automation',
      desc: 'Orchestrating robust task systems using tools like n8n or Make, transforming slow manual updates into secure autonomous procedures.',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      color: 'from-yellow-600/10 to-yellow-500/5'
    },
    {
      title: 'Product Engineering',
      desc: 'Focusing on rapid execution and UX quality, matching professional speed with aesthetic styling, and smooth system transitions.',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      color: 'from-pink-600/10 to-pink-500/5'
    },
    {
      title: 'API Integrations',
      desc: 'Plugging and binding third-party platforms, customized OAuth flows, CRM backends, and modular micro-services seamlessly.',
      icon: <Link className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-600/10 to-emerald-500/5'
    },
    {
      title: 'Business Solutions',
      desc: 'Bridging technical capabilities with operational goals (time-reduction, lead conversion, manual overhead reductions) to drive real-world values.',
      icon: <Briefcase className="w-5 h-5 text-orange-400" />,
      color: 'from-orange-600/10 to-orange-500/5'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="about-heading">
          About Me
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main core pitch */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl glass-card p-6 sm:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200"
            id="about-pitch-card"
          >
            <div className="flex items-center gap-3 mb-6" id="about-grad-badge">
              <span className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <GraduationCap className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white dark:text-white light:text-zinc-900 font-display">
                  MCA Scholar & Developer
                </h3>
                <p className="text-xs text-slate-500 font-mono">Chaitanya Deemed University</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-700 leading-relaxed mb-6 font-sans">
              I am an MCA student, Full-Stack Developer, AI Engineer, and Product Builder passionate about creating AI-powered applications, automation systems, SaaS products, and scalable web solutions.
            </p>

            <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-700 leading-relaxed font-sans">
              I have experience delivering real-world client projects and transforming business requirements into production-ready software.
            </p>

            {/* Availability Highlights */}
            <div className="mt-8 pt-6 border-t border-white/5 dark:border-white/5 light:border-zinc-200 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-mono">Current Status</span>
                <span className="text-sm font-semibold text-emerald-400 mt-1">Available for Freelance</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-mono">Location Scope</span>
                <span className="text-sm font-semibold text-purple-400 mt-1">Remote / Global</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Pillars Grid Display */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-mono tracking-wider text-purple-400 uppercase font-bold mb-4" id="about-pillars-header">
            Core Specialized Domains
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focuses.map((focus, idx) => (
              <motion.div
                key={focus.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ transform: 'translateY(-2px)' }}
                className={`rounded-xl glass-card p-5 hover:border-purple-500/30 transition-all cursor-crosshair bg-gradient-to-br ${focus.color} dark:bg-zinc-950/40 light:bg-white light:border-zinc-200 light:hover:border-purple-300 shadow-sm`}
                id={`about-focus-card-${idx}`}
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/5 dark:bg-zinc-900 light:bg-zinc-100 light:border-zinc-200">
                    {focus.icon}
                  </div>
                  <h4 className="text-sm font-bold font-display text-white dark:text-white light:text-zinc-900">
                    {focus.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                  {focus.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
