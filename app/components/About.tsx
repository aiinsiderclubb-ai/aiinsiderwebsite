'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Globe, Shield } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'AI responses in milliseconds',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      desc: 'Swiss quality, worldwide service',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      desc: 'Your data stays yours',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-accent-violet/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 glass rounded-full mb-6"
            >
              <span className="text-sm font-medium gradient-text">About AI Insider</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight"
            >
              Creative AI Studio
              <span className="block gradient-text mt-2">Building the Future</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              <span className="text-accent-cyan font-semibold">AI Insider</span> is a creative AI studio 
              based in <span className="text-accent-violet font-semibold">Switzerland</span>, building 
              intelligent automations and custom agents for forward-thinking brands.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-400 leading-relaxed"
            >
              We don't just automate tasks — we create AI systems that understand context, 
              make decisions, and communicate naturally. From voice agents to workflow automations, 
              we turn complexity into simplicity.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass mb-3">
                    <feature.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: AI Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              {/* Central Core */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glass-strong neon-cyan"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold gradient-text">AI</span>
                </div>
              </motion.div>

              {/* Orbiting Nodes */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 360) / 6;
                const radius = 150;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full glass neon-border-violet"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [
                        Math.cos((angle * Math.PI) / 180) * radius,
                        Math.cos(((angle + 360) * Math.PI) / 180) * radius,
                      ],
                      y: [
                        Math.sin((angle * Math.PI) / 180) * radius,
                        Math.sin(((angle + 360) * Math.PI) / 180) * radius,
                      ],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.5,
                    }}
                  />
                );
              })}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {[...Array(6)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="50%"
                    stroke="rgba(0, 255, 255, 0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

