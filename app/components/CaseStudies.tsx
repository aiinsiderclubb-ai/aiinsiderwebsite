'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const cases = [
  {
    title: 'Hilcona Voice Agent',
    desc: 'From call to meeting in 30 seconds.',
    category: 'Voice AI',
    image: '/images/case1.jpg',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'AI Recruiting Agent',
    desc: 'Interview Scheduling on Autopilot.',
    category: 'Automation',
    image: '/images/case2.jpg',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    title: 'Real Estate Lead Bot',
    desc: 'WhatsApp to CRM in 10 Seconds.',
    category: 'Lead Gen',
    image: '/images/case3.jpg',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Meta Ads Intelligence',
    desc: 'Weekly AI Reporting.',
    category: 'Analytics',
    image: '/images/case4.jpg',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 glass rounded-full mb-6"
          >
            <span className="text-sm font-medium gradient-text">Case Studies</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Real Results,
            <span className="block gradient-text mt-2">Real Impact</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we've transformed businesses with intelligent automation.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group cursor-pointer"
              href="#contact"
            >
              {/* Card */}
              <div className="relative h-80 rounded-3xl overflow-hidden glass-strong">
                {/* Background Image Placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${caseStudy.gradient} opacity-50`}
                />

                {/* Play Icon Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={
                    hoveredIndex === index
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full glass-strong neon-cyan flex items-center justify-center"
                    animate={
                      hoveredIndex === index
                        ? { scale: 1.1 }
                        : { scale: 1 }
                    }
                  >
                    <Play className="w-8 h-8 text-accent-cyan ml-1" />
                  </motion.div>
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  {/* Category Badge */}
                  <motion.span
                    className="inline-block px-3 py-1 glass rounded-full text-xs font-medium text-accent-cyan mb-4 w-fit"
                    animate={
                      hoveredIndex === index
                        ? { y: -5 }
                        : { y: 0 }
                    }
                  >
                    {caseStudy.category}
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold font-heading mb-2"
                    animate={
                      hoveredIndex === index
                        ? { y: -5 }
                        : { y: 0 }
                    }
                  >
                    {caseStudy.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-300"
                    animate={
                      hoveredIndex === index
                        ? { y: -5, opacity: 1 }
                        : { y: 0, opacity: 0.8 }
                    }
                  >
                    {caseStudy.desc}
                  </motion.p>

                  {/* Learn More Link */}
                  <motion.div
                    className="flex items-center gap-2 text-accent-cyan font-medium mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      hoveredIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                  >
                    <span>View Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Neon Border on Hover */}
                <motion.div
                  className="absolute inset-0 neon-border-cyan rounded-3xl opacity-0"
                  animate={
                    hoveredIndex === index
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

