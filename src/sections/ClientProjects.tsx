/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Target, ArrowRightCircle, Sparkles, Code2, AlertCircle, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ClientProjects: React.FC = () => {
  const { clientProjects } = usePortfolio();

  return (
    <section id="client-case-studies" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Backdrop effects */}
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="client-projects-heading">
          Client Case Studies
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Deep-dives into real-world business optimization metrics achieved for contracted partners and startups.
        </p>
      </div>

      <div className="space-y-12" id="client-projects-list">
        {clientProjects.map((caseStudy, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              id={`case-card-${caseStudy.id}`}
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-6 sm:p-8 md:p-12 border-white/5 hover:border-purple-500/20 transition-colors dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200`}
            >
              {/* Product Visual Mock / Image (Span 5) */}
              <div className={`lg:col-span-5 h-64 sm:h-80 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 dark:border-white/5 light:border-zinc-200 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <img
                  referrerPolicy="no-referrer"
                  src={caseStudy.screenshotUrl || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80'}
                  alt={caseStudy.clientName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex flex-col">
                  <span className="text-[10px] font-mono uppercase bg-purple-500 text-white px-2 py-0.5 rounded-full w-max mb-1 font-bold">
                    {caseStudy.industry}
                  </span>
                  <span className="text-sm font-semibold text-white">{caseStudy.clientName} Case File</span>
                </div>
              </div>

              {/* Problem/Solution Text Description (Span 7) */}
              <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`} id={`case-details-${caseStudy.id}`}>
                <div>
                  {/* Title Bar */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Target className="w-5.5 h-5.5" />
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-zinc-950">
                        {caseStudy.clientName}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono tracking-wide">{caseStudy.industry}</p>
                    </div>
                  </div>

                  {/* Problem Statement Card */}
                  <div className="mb-5 flex gap-3 text-xs bg-red-500/5 dark:bg-red-500/5 light:bg-red-50/50 p-4 border border-red-500/15 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">The Critical Problem</span>
                      <p className="text-slate-300 dark:text-slate-300 light:text-zinc-700 leading-relaxed font-sans">{caseStudy.problem}</p>
                    </div>
                  </div>

                  {/* Provided Solution Card */}
                  <div className="mb-5 flex gap-3 text-xs bg-purple-500/5 dark:bg-purple-500/5 light:bg-purple-50/50 p-4 border border-purple-500/15 rounded-xl">
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">Our Engineered Solution</span>
                      <p className="text-slate-300 dark:text-slate-300 light:text-zinc-700 leading-relaxed font-sans">{caseStudy.solution}</p>
                    </div>
                  </div>

                  {/* Operational Results achieved */}
                  <div className="mb-6 flex gap-3 text-xs bg-emerald-500/5 dark:bg-emerald-500/5 light:bg-emerald-50/50 p-4 border border-emerald-500/15 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">Results & Value Achieved</span>
                      <p className="text-slate-300 dark:text-slate-300 light:text-zinc-700 leading-relaxed font-sans font-medium">{caseStudy.results}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Technologies used */}
                <div className="border-t border-white/5 dark:border-white/5 light:border-zinc-150 pt-5 flex flex-wrap gap-2.5 items-center">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase flex items-center gap-1.5 mr-2">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tech Stack:</span>
                  </span>
                  
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-semibold bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-zinc-100 border border-white/5 dark:border-white/5 light:border-zinc-200 text-slate-400 dark:text-slate-400 light:text-zinc-650 px-2.2 py-0.6 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
