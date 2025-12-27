'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    role: 'client',
    message: 'Your AI Agent has reduced our support time by 70%.',
    author: 'Sarah Johnson',
    company: 'TechCorp',
  },
  {
    role: 'ai',
    message: 'Happy to hear that! We optimize automations to feel human.',
    author: 'AI Insider',
    company: 'Response',
  },
  {
    role: 'client',
    message: 'The voice agent books meetings faster than our sales team ever could.',
    author: 'Michael Chen',
    company: 'SalesFlow',
  },
  {
    role: 'ai',
    message: "That's the power of AI — speed meets intelligence.",
    author: 'AI Insider',
    company: 'Response',
  },
  {
    role: 'client',
    message: 'Integration was seamless. It felt like magic.',
    author: 'Emma Williams',
    company: 'StartupXYZ',
  },
  {
    role: 'ai',
    message: 'We build it right the first time. No shortcuts.',
    author: 'AI Insider',
    company: 'Response',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-10" />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm font-medium gradient-text">Testimonials</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            What Our
            <span className="block gradient-text mt-2">Clients Say</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real conversations, real results.
          </p>
        </motion.div>

        {/* Chat-Style Testimonials */}
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => {
            const isClient = testimonial.role === 'client';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isClient ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex ${isClient ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-md glass-strong rounded-3xl p-6 border ${
                    isClient
                      ? 'border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.1)] rounded-tl-none'
                      : 'border-violet-500/30 shadow-[0_0_12px_rgba(153,69,255,0.1)] rounded-tr-none'
                  }`}
                >
                  {/* Quote Icon */}
                  <Quote
                    className={`w-6 h-6 mb-3 ${
                      isClient ? 'text-cyan-400' : 'text-violet-400'
                    }`}
                  />

                  {/* Message */}
                  <p className="text-lg mb-4 leading-relaxed">
                    {testimonial.message}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        isClient
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                          : 'bg-gradient-to-br from-violet-500 to-purple-500'
                      } flex items-center justify-center text-sm font-bold`}
                    >
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
