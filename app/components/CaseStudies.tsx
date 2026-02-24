'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Play, Phone, Bot, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';

const cases = [
  {
    title: 'Hilcona Voice Agent',
    desc: 'From call to meeting in 30 seconds.',
    category: 'Voice AI',
    icon: Phone,
    gradient: 'from-blue-500/30 via-purple-500/20 to-transparent',
    accentColor: 'blue',
    stats: { value: '30s', label: 'Avg response' },
  },
  {
    title: 'AI Recruiting Agent',
    desc: 'Interview Scheduling on Autopilot.',
    category: 'Automation',
    icon: Bot,
    gradient: 'from-emerald-500/30 via-teal-500/20 to-transparent',
    accentColor: 'emerald',
    stats: { value: '85%', label: 'Time saved' },
  },
  {
    title: 'Real Estate Lead Bot',
    desc: 'WhatsApp to CRM in 10 Seconds.',
    category: 'Lead Gen',
    icon: MessageSquare,
    gradient: 'from-orange-500/30 via-red-500/20 to-transparent',
    accentColor: 'orange',
    stats: { value: '3x', label: 'More leads' },
  },
  {
    title: 'Meta Ads Intelligence',
    desc: 'Weekly AI Reporting.',
    category: 'Analytics',
    icon: BarChart3,
    gradient: 'from-violet-500/30 via-indigo-500/20 to-transparent',
    accentColor: 'violet',
    stats: { value: '24/7', label: 'Monitoring' },
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" className="relative py-24 px-6 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header — Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Animated badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10 border border-white/15 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Case Studies</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-white leading-[1.1]">
            Real Results,
            <span className="relative inline-block ml-4">
              <span 
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Real Impact
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            See how we've transformed businesses with intelligent automation.
          </p>
        </motion.div>

        {/* Cases Grid — Premium Bento Design */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((caseStudy, index) => {
            const Icon = caseStudy.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative group cursor-pointer"
                href="#contact"
              >
                {/* Outer glow on hover */}
                <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br ${caseStudy.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative h-[380px] md:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
                  
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <Icon className="w-full h-full" />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Play button — centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                      {/* Ripple effect */}
                      <div className="absolute inset-0 w-24 h-24 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top section */}
                    <div className="flex items-start justify-between">
                      {/* Icon badge */}
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-xl transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:scale-110">
                        <Icon className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
                      </div>

                      {/* Stats badge */}
                      <div className="flex flex-col items-end">
                        <div className="text-2xl md:text-3xl font-bold text-white">{caseStudy.stats.value}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider">{caseStudy.stats.label}</div>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div>
                      {/* Category */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                          {caseStudy.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold font-heading mb-3 text-white transition-transform duration-300 group-hover:-translate-y-1">
                        {caseStudy.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-lg mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                        {caseStudy.desc}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-white font-semibold">View Case Study</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="w-4 h-4 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 relative"
            style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.25)' }}
          >
            <span className="relative z-10">See All Case Studies</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
