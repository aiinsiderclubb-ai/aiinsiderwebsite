'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const cases = [
  {
    title: 'Hilcona Voice Agent',
    desc: 'From call to meeting in 30 seconds.',
    category: 'Voice AI',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'AI Recruiting Agent',
    desc: 'Interview Scheduling on Autopilot.',
    category: 'Automation',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    title: 'Real Estate Lead Bot',
    desc: 'WhatsApp to CRM in 10 Seconds.',
    category: 'Lead Gen',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Meta Ads Intelligence',
    desc: 'Weekly AI Reporting.',
    category: 'Analytics',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-20" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm font-medium gradient-text">Case Studies</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Real Results,
            <span className="block gradient-text mt-2">Real Impact</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we've transformed businesses with intelligent automation.
          </p>
        </motion.div>

        {/* Cases Grid - Pure CSS hover */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              href="#contact"
            >
              {/* Card - CSS transitions only */}
              <div className="relative h-80 rounded-3xl overflow-hidden glass-strong 
                transform transition-all duration-300 ease-out
                hover:scale-[1.02] border border-transparent hover:border-cyan-500/30
                hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient} opacity-50`}
                />

                {/* Play Icon Overlay - CSS only */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center
                    transform transition-transform duration-300 scale-90 group-hover:scale-100
                    shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Play className="w-8 h-8 text-cyan-400 ml-1" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 glass rounded-full text-xs font-medium text-cyan-400 mb-4 w-fit
                    transform transition-transform duration-300 group-hover:-translate-y-1">
                    {caseStudy.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading mb-2
                    transform transition-transform duration-300 group-hover:-translate-y-1">
                    {caseStudy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 transition-all duration-300 group-hover:-translate-y-1">
                    {caseStudy.desc}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-cyan-400 font-medium mt-4
                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>View Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
