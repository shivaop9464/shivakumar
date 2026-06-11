/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, Smartphone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { addContactMessage } = usePortfolio();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status logs
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = 'Please provide your full name.';
    if (!email.trim()) {
      nextErrors.email = 'E-mail address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please provide a valid e-mail format (e.g. user@abc.com).';
    }
    if (!subject.trim()) nextErrors.subject = 'Subject heading is required.';
    if (!message.trim()) {
      nextErrors.message = 'Please write a message description.';
    } else if (message.trim().length < 10) {
      nextErrors.message = 'Message should contain at least 10 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // Simulate standard server post delay
    setTimeout(() => {
      addContactMessage({
        name,
        email,
        subject,
        message
      });
      setIsSending(false);
      setIsSubmitted(true);
      
      // Flush fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto clear success indicator after 6 seconds
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 relative max-w-7xl mx-auto">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="text-center mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="contact-heading">
          Get in Touch
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          Have an AI agent, web platform or workflow automation project in mind? Shoot me a message and let's configure standard pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch" id="contact-container">
        {/* Left column info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glass-card p-6 sm:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 border-white/5 space-y-8 flex flex-col justify-between h-full"
            id="contact-details-box"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 tracking-wider uppercase block mb-3">Directory Log</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-zinc-100 mb-2">
                Let's talk business requirements
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans mb-8">
                I assist startups and companies in streamlining manual work, creating high-gloss frontends, and connecting automation engines.
              </p>

              {/* Specific Anchor Contacts */}
              <div className="space-y-5">
                {/* Mail */}
                <div className="flex items-center gap-4 text-xs font-sans">
                  <span className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-slate-500 block font-mono">Send an Email</span>
                    <a href="mailto:shivakumar8179319464@gmail.com" className="text-sm font-semibold text-white dark:text-white light:text-zinc-800 hover:text-purple-400 transition-colors">
                      shivakumar8179319464@gmail.com
                    </a>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-4 text-xs font-sans">
                  <span className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Smartphone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-slate-500 block font-mono">Mobile & WhatsApp</span>
                    <a href="https://wa.me/918179319464" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white dark:text-white light:text-zinc-800 hover:text-purple-400 transition-colors">
                      +91 8179319464
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 text-xs font-sans">
                  <span className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-slate-500 block font-mono">Location Base</span>
                    <span className="text-sm font-semibold text-white dark:text-white light:text-zinc-800">
                      Hyderabad, Telangana, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social credentials anchors */}
            <div className="border-t border-white/5 dark:border-white/5 light:border-zinc-150 pt-8" id="contact-social-row">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">Connect on Networks</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/shivaop9464"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg glass-card border-white/5 bg-[#0f0f12]/40 hover:bg-white/10 text-slate-400 hover:text-white dark:bg-[#0f0f12] light:bg-zinc-100 light:border-zinc-200 light:text-zinc-650 transition-all hover:scale-105"
                  id="contact-git-btn"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shiva-kumar-716a0123a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg glass-card border-white/5 bg-[#0f0f12]/40 hover:bg-white/10 text-slate-400 hover:text-blue-400 dark:bg-[#0f0f12] light:bg-zinc-100 light:border-zinc-200 light:text-zinc-650 transition-all hover:scale-105"
                  id="contact-ln-btn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glass-card p-6 sm:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 border-white/5"
            id="contact-form-box"
          >
            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-xs font-mono font-medium text-slate-500">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }}
                    placeholder="Full Name"
                    className={`w-full px-3.5 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 bg-[#0f0f12]/45 border-white/5 outline-none transition-all dark:bg-black/35 light:bg-zinc-100 ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30'
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-400 font-mono italic">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="text-xs font-mono font-medium text-slate-500">Your Email</label>
                  <input
                    id="form-email"
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 bg-[#0f0f12]/45 border-white/5 outline-none transition-all dark:bg-black/35 light:bg-zinc-100 ${
                      errors.email ? 'border-red-500/50 focus:border-red-500' : 'focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-400 font-mono italic">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-subject" className="text-xs font-mono font-medium text-slate-500">Subject / Objective</label>
                <input
                  id="form-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); if (errors.subject) setErrors(prev => ({ ...prev, subject: undefined })); }}
                  placeholder="e.g., n8n Automation Workflow or SaaS frontend creation"
                  className={`w-full px-3.5 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 bg-[#0f0f12]/45 border-white/5 outline-none transition-all dark:bg-black/35 light:bg-zinc-100 ${
                    errors.subject ? 'border-red-500/50 focus:border-red-500' : 'focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30'
                  }`}
                />
                {errors.subject && <span className="text-[10px] text-red-400 font-mono italic">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-message" className="text-xs font-mono font-medium text-slate-500">Message Description</label>
                <textarea
                  id="form-message"
                  rows={5}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: undefined })); }}
                  placeholder="Write details of your business objective or product details here..."
                  className={`w-full px-3.5 py-2.5 rounded-lg glass-card text-xs font-medium dark:text-white light:text-zinc-800 bg-[#0f0f12]/45 border-white/5 outline-none transition-all dark:bg-black/35 light:bg-zinc-100 resize-none ${
                    errors.message ? 'border-red-500/50 focus:border-red-500' : 'focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30'
                  }`}
                />
                {errors.message && <span className="text-[10px] text-red-400 font-mono italic">{errors.message}</span>}
              </div>

              {/* Success Notification message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    id="contact-success-indicator"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-2.5 items-start p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-left"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block font-sans">Contact Ticket Successfully Registered!</span>
                      <p className="opacity-80 font-mono mt-0.5">Your simulation was recorded. It is logged instantly under the "Manage Testimonials / Messages" admin log.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Submit */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSending}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-505 hover:to-blue-505 disabled:bg-indigo-950/20 text-white font-semibold shadow shadow-purple-600/15 transition-all text-xs transform active:scale-98"
              >
                {isSending ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/80 border-t-transparent animate-spin inline-block"></span>
                    <span>Sending Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
