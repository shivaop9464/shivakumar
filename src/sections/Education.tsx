/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { EDUCATION_DATA } from '../data/defaults';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 relative max-w-5xl mx-auto">
      {/* Visual background lights */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="education-heading">
          Academic Journey
        </h2>
        <p className="text-sm font-mono text-slate-500 max-w-md mx-auto">
          A vertical log of my formal education and foundation milestones.
        </p>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded mt-4"></div>
      </div>

      <div className="relative border-l-2 border-dashed border-zinc-800 dark:border-zinc-800 light:border-zinc-200 ml-4 md:ml-32 md:pl-12 pl-6 space-y-12">
        {EDUCATION_DATA.map((milestone, index) => {
          const isCurrent = milestone.duration === 'Current';
          return (
            <motion.div
              id={`edu-item-${index}`}
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Connector Dot */}
              <span className={`absolute -left-[35px] md:-left-[57px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                isCurrent 
                  ? 'bg-purple-950 border-purple-500 text-purple-300' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800 light:bg-zinc-100 light:border-zinc-300 light:text-zinc-600'
              } shadow-lg`}>
                <GraduationCap className="w-3.5 h-3.5" />
              </span>

              {/* Main milestone card */}
              <div 
                className={`rounded-2xl glass-card p-6 md:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 transition-all duration-300 ${
                  isCurrent 
                    ? 'border-purple-500/25 dark:border-purple-500/25 light:border-purple-200 shadow-lg glow-purple' 
                    : 'hover:border-zinc-700/50 light:hover:border-zinc-300'
                }`}
              >
                {/* Year tag & Current indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{milestone.duration}</span>
                  </div>
                  
                  {isCurrent && (
                    <span className="text-[10px] bg-purple-500/15 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold tracking-wider">
                      Currently Pursuing / Active
                    </span>
                  )}
                </div>

                {/* Institution & Title */}
                <h3 className="text-xl font-bold font-display text-white dark:text-white light:text-zinc-950 mb-1.5 matches-title">
                  {milestone.stage}
                </h3>
                <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mb-5 font-sans">
                  {milestone.institution}
                </p>

                {/* Stats summary / Graded system */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-zinc-100 border border-white/5 dark:border-white/5 light:border-zinc-200">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono text-slate-500">{milestone.scoreLabel}:</span>
                  <span className="text-xs font-semibold font-mono text-white dark:text-white light:text-zinc-900 bg-white/5 dark:bg-white/5 light:bg-zinc-200/50 px-2 py-0.5 rounded">
                    {milestone.scoreVal}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
