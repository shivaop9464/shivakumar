/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Brain, CloudLightning, ToggleRight, Network, Code, Rocket } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  tag: string;
}

export const Services: React.FC = () => {
  const servicesList: ServiceItem[] = [
    {
      title: 'AI Application Development',
      desc: 'Build intelligent AI-powered applications.',
      longDesc: 'Formulating end-to-end intelligent software including context-aware search, RAG pipelines, custom chatbots, automated parsing systems, and LLM integrations.',
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      tag: 'Gemini, OpenAI, LangChain'
    },
    {
      title: 'SaaS Product Development',
      desc: 'Develop complete SaaS platforms.',
      longDesc: 'Developing multi-tenant digital SaaS models with secure billing nodes, client telemetry trackers, automated notification webhooks, and responsive visual charts.',
      icon: <CloudLightning className="w-6 h-6 text-blue-400" />,
      tag: 'Full-Stack, Metric Charts, Stripe'
    },
    {
      title: 'Workflow Automation',
      desc: 'Automate repetitive business tasks.',
      longDesc: 'Streamlining operations using webhooks, cron-triggers, custom API bridges, and platforms like n8n or Make to eliminate manual administrative overhead.',
      icon: <ToggleRight className="w-6 h-6 text-yellow-400" />,
      tag: 'n8n, Webhook Bridges, Cron Nodes'
    },
    {
      title: 'Full-Stack Development',
      desc: 'Build scalable modern web applications.',
      longDesc: 'Engineering performant monolithic or decoupled SPA web frontends paired with Express or Serverless backends, optimizing asset delivery and type boundaries.',
      icon: <Code className="w-6 h-6 text-cyan-400" />,
      tag: 'React, Node, Express, TypeScript'
    },
    {
      title: 'API Integration',
      desc: 'Integrate third-party services and AI tools.',
      longDesc: 'Securing robust, rate-limited, and failure-tolerant API integrations (OAuth, CRUD gateways, telemetry trackers, and CRMs) with strict type safety.',
      icon: <Network className="w-6 h-6 text-emerald-400" />,
      tag: 'OAuth2, Rest Gateways, CRM Sync'
    },
    {
      title: 'MVP Development',
      desc: 'Rapid product development for startups.',
      longDesc: 'Translating concepts into clickable prototypes and highly responsive MVPs in 1-2 weeks, keeping interfaces lightweight, functional, and layout-clean.',
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      tag: '1-to-2 Weeks Prototype Delivery'
    }
  ];

  return (
    <section id="services" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Lights */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white dark:text-white light:text-zinc-950 mb-4" id="services-heading">
          Services & Offerings
        </h2>
        <div className="h-1 w-12 bg-purple-500 mx-auto rounded"></div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
          High-end professional capabilities designed to solve operational bottlenecks and fast-track digital products to market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid">
        {servicesList.map((service, index) => (
          <motion.div
            id={`service-card-${index}`}
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-2xl glass-card p-6 md:p-8 dark:bg-[#0f0f12]/50 light:bg-white light:border-zinc-200 flex flex-col justify-between group border-white/5 hover:border-purple-500/30 transition-all cursor-pointer shadow-sm"
          >
            <div>
              {/* Header Icon & Tag */}
              <div className="flex items-start justify-between mb-6">
                <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-white/5 dark:bg-zinc-900 light:bg-zinc-100 light:border-zinc-200">
                  {service.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase border border-white/5 dark:border-white/5 light:border-zinc-200 px-2 py-0.5 rounded">
                  {service.tag}
                </span>
              </div>

              {/* Title & Core Summary */}
              <h3 className="text-lg md:text-xl font-bold font-display text-white dark:text-white light:text-zinc-950 mb-2">
                {service.title}
              </h3>
              <p className="text-sm font-semibold text-purple-400 mb-4">
                {service.desc}
              </p>

              {/* Long Description details */}
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans mt-2">
                {service.longDesc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 dark:border-white/5 light:border-zinc-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-purple-400 transition-colors font-mono">
              <span>Delivery Time: Rapid</span>
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">➔</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
