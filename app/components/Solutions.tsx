'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mic, Workflow, LineChart, Sparkles } from 'lucide-react';

const solutions = [
  {
    title: 'Voice & Chat Agents',
    desc: 'Humanized AI that talks to your customers and books meetings in real-time.',
    icon: Mic,
  },
  {
    title: 'Workflow Automations',
    desc: 'From lead capture to CRM integration — fully automated workflows.',
    icon: Workflow,
  },
  {
    title: 'Analytics Assistants',
    desc: 'AI that analyzes data and delivers weekly reports with insights.',
    icon: LineChart,
  },
  {
    title: 'Custom AI Models',
    desc: 'Tailor-made GPT and RAG systems integrated with your stack.',
    icon: Sparkles,
  },
];

export default function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solutions" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background Orbs - Monochrome */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Our Solutions</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
            <span className="block text-white">Build Smarter,</span>
            <span 
              className="block text-6xl md:text-8xl mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ship Faster
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Revolutionary AI solutions that transform how you work.
          </p>
        </motion.div>

        {/* Solutions Grid - Monochrome */}
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative group cursor-pointer"
                href="#contact"
              >
                {/* Card */}
                <div 
                  className="relative h-full p-8 glass-strong rounded-3xl overflow-hidden border border-white/10
                    transform transition-all duration-300 ease-out
                    hover:scale-[1.03] hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-white
                        transform transition-transform duration-300 group-hover:scale-110"
                      style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}
                    >
                      <Icon className="w-10 h-10 text-black" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold font-heading mb-4 text-white">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                      {solution.desc}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-3 text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-x-2">
                      <span>Explore</span>
                      <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA - Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg 
              transform transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}
          >
            Request Custom Solution
            <Sparkles className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
