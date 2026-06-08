/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Testimonials: React.FC = () => {
  const { testimonials } = usePortfolio();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const length = testimonials.length;

  const nextSlide = () => {
    if (length === 0) return;
    setDirection('right');
    setActive((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    if (length === 0) return;
    setDirection('left');
    setActive((prev) => (prev - 1 + length) % length);
  };

  // Reset/Start auto loop timer
  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000); // Auto-slide every 6 seconds
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, length]);

  if (length === 0) return null;

  const current = testimonials[active];

  // Motion variants for slide transition
  const variants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -60 : 60,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 px-4 relative max-w-5xl mx-auto overflow-hidden">
      {/* Background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="testimonials-heading">
          Client Feedback
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Read what previous business partners, company managers, and tech founders have written after contracting services.
        </p>
      </div>

      {/* Slide Container cards */}
      <div 
        className="relative min-h-[340px] flex items-center justify-center p-2" 
        id="testimonials-slider-box"
        onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
        onMouseLeave={restartTimer}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full rounded-2xl glass-card p-8 md:p-12 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 border-white/5 relative shadow-xl flex flex-col justify-between"
            id={`testimonial-slide-card-${current.id}`}
          >
            {/* Quote Icon details */}
            <Quote className="absolute top-6 right-8 w-12 h-12 text-purple-500/10 dark:text-purple-500/10 light:text-zinc-400/10 pointer-events-none" />

            <div>
              {/* Star Rating decoration */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">★</span>
                ))}
              </div>

              {/* Review Text details */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 dark:text-slate-300 light:text-zinc-700 italic font-sans leading-relaxed tracking-wide mb-8">
                "{current.review}"
              </p>
            </div>

            {/* Profile row review author */}
            <div className="flex items-center gap-4.5 pt-6 border-t border-white/5 dark:border-white/5 light:border-zinc-150">
              {current.photoUrl ? (
                <img
                  referrerPolicy="no-referrer"
                  src={current.photoUrl}
                  alt={current.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/35"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold font-display text-white dark:text-white light:text-zinc-950">
                  {current.clientName}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {current.position}, <span className="text-purple-400">{current.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Sliding controls footer */}
      <div className="flex items-center justify-between mt-10 px-4" id="testimonials-controls">
        {/* Pagination Glass Dots */}
        <div className="flex gap-1.5">
          {testimonials.map((t, idx) => (
            <button
              id={`testimonial-dot-${idx}`}
              key={t.id}
              onClick={() => {
                setDirection(idx > active ? 'right' : 'left');
                setActive(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === idx 
                  ? 'w-6 bg-purple-500' 
                  : 'w-2.5 bg-zinc-800 dark:bg-zinc-850 light:bg-zinc-300'
              }`}
            />
          ))}
        </div>

        {/* Direction arrows buttons */}
        <div className="flex gap-2.5">
          <button
            id="testimonial-prev-arrow"
            onClick={prevSlide}
            className="p-2.5 rounded-lg glass-card border-white/5 text-slate-400 hover:text-white dark:bg-[#0f0f12]/40 light:bg-white light:border-zinc-200 light:text-zinc-600 light:hover:bg-zinc-50 hover:border-purple-500/25 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            id="testimonial-next-arrow"
            onClick={nextSlide}
            className="p-2.5 rounded-lg glass-card border-white/5 text-slate-400 hover:text-white dark:bg-[#0f0f12]/40 light:bg-white light:border-zinc-200 light:text-zinc-600 light:hover:bg-zinc-50 hover:border-purple-500/25 transition-all active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
