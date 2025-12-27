'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mic, Workflow, LineChart, Sparkles } from 'lucide-react';

const solutions = [
  {
    title: 'Voice & Chat Agents',
    desc: 'Humanized AI that talks to your customers and books meetings in real-time.',
    icon: Mic,
    gradient: 'from-cyan-500 via-blue-500 to-violet-500',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    borderColor: 'border-cyan-500/50',
  },
  {
    title: 'Workflow Automations',
    desc: 'From lead capture to CRM integration — fully automated workflows.',
    icon: Workflow,
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    glowColor: 'rgba(153, 69, 255, 0.4)',
    borderColor: 'border-violet-500/50',
  },
  {
    title: 'Analytics Assistants',
    desc: 'AI that analyzes data and delivers weekly reports with insights.',
    icon: LineChart,
    gradient: 'from-pink-500 via-rose-500 to-orange-500',
    glowColor: 'rgba(255, 0, 128, 0.4)',
    borderColor: 'border-pink-500/50',
  },
  {
    title: 'Custom AI Models',
    desc: 'Tailor-made GPT and RAG systems integrated with your stack.',
    icon: Sparkles,
    gradient: 'from-yellow-400 via-green-400 to-cyan-400',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    borderColor: 'border-yellow-500/50',
  },
];

export default function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="solutions" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background Orbs - No animation for performance */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12) 0%, transparent 60%)',
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full mb-8 border border-white/10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <span className="text-sm font-medium gradient-text-animated">Our Solutions</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
            <span className="block">Build Smarter,</span>
            <span className="block gradient-text-animated text-6xl md:text-8xl mt-2">Ship Faster</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary AI solutions that transform how you work.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
                href="#contact"
              >
                {/* Card */}
                <motion.div 
                  className={`relative h-full p-8 glass-strong rounded-3xl overflow-hidden border-2 ${solution.borderColor} transition-all duration-500`}
                  animate={
                    hoveredIndex === index
                      ? { 
                          scale: 1.05,
                          y: -10,
                        }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-20`}
                    animate={
                      hoveredIndex === index
                        ? { opacity: 0.2 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.5 }}
                  />

                  {/* Glow Effect - CSS transition instead of Framer Motion */}
                  <div
                    className="absolute inset-0 rounded-3xl transition-shadow duration-300"
                    style={{
                      boxShadow: hoveredIndex === index
                        ? `0 0 30px ${solution.glowColor}`
                        : 'none',
                    }}
                  />

                  {/* Animated Border */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-100 p-[2px]`}
                    style={{
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br ${solution.gradient} relative`}
                      animate={
                        hoveredIndex === index
                          ? { 
                              scale: 1.1, 
                              rotate: [0, -10, 10, 0],
                            }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                      
                      {/* Icon Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={
                          hoveredIndex === index
                            ? {
                                boxShadow: `0 0 30px ${solution.glowColor}`,
                              }
                            : { boxShadow: 'none' }
                        }
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold font-heading mb-4">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      {solution.desc}
                    </p>

                    {/* Learn More Link */}
                    <motion.div
                      className="flex items-center gap-3 text-lg font-semibold"
                      animate={
                        hoveredIndex === index
                          ? { x: 10 }
                          : { x: 0 }
                      }
                    >
                      <span className="gradient-text-animated">Explore</span>
                      <motion.span
                        animate={
                          hoveredIndex === index
                            ? { x: 5 }
                            : { x: 0 }
                        }
                        className="text-2xl"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-30 blur-3xl rounded-full`}
                    animate={
                      hoveredIndex === index
                        ? { scale: 1.5, opacity: 0.3 }
                        : { scale: 1, opacity: 0 }
                    }
                  />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Request Custom Solution
            <Sparkles className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
