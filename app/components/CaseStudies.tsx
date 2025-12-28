'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const cases = [
  {
    title: 'Hilcona Voice Agent',
    desc: 'From call to meeting in 30 seconds.',
    category: 'Voice AI',
  },
  {
    title: 'AI Recruiting Agent',
    desc: 'Interview Scheduling on Autopilot.',
    category: 'Automation',
  },
  {
    title: 'Real Estate Lead Bot',
    desc: 'WhatsApp to CRM in 10 Seconds.',
    category: 'Lead Gen',
  },
  {
    title: 'Meta Ads Intelligence',
    desc: 'Weekly AI Reporting.',
    category: 'Analytics',
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" className="relative py-32 px-6 overflow-hidden">
      {/* Background - Monochrome */}
      <div className="absolute inset-0 neural-bg opacity-10" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
            <span className="text-sm font-medium text-white">Case Studies</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-white">
            Real Results,
            <span 
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Real Impact
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we've transformed businesses with intelligent automation.
          </p>
        </motion.div>

        {/* Cases Grid - Monochrome */}
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
              {/* Card */}
              <div className="relative h-80 rounded-3xl overflow-hidden glass-strong 
                transform transition-all duration-300 ease-out
                hover:scale-[1.02] border border-white/10 hover:border-white/30
                hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                
                {/* Background Gradient - Monochrome */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"
                />

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center border border-white/30
                    transform transition-transform duration-300 scale-90 group-hover:scale-100"
                    style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}>
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 glass rounded-full text-xs font-medium text-white mb-4 w-fit border border-white/20
                    transform transition-transform duration-300 group-hover:-translate-y-1">
                    {caseStudy.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading mb-2 text-white
                    transform transition-transform duration-300 group-hover:-translate-y-1">
                    {caseStudy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 transition-all duration-300 group-hover:-translate-y-1">
                    {caseStudy.desc}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-white font-medium mt-4
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
