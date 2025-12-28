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
      {/* Background - Monochrome */}
      <div className="absolute inset-0 neural-bg opacity-5" />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header - Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
            <span className="text-sm font-medium text-white">Testimonials</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-white">
            What Our
            <span 
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Clients Say
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real conversations, real results.
          </p>
        </motion.div>

        {/* Chat-Style Testimonials - Monochrome */}
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
                  className={`max-w-md glass-strong rounded-3xl p-6 border border-white/20 ${
                    isClient ? 'rounded-tl-none' : 'rounded-tr-none'
                  }`}
                  style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)' }}
                >
                  {/* Quote Icon */}
                  <Quote className="w-6 h-6 mb-3 text-white/60" />

                  {/* Message */}
                  <p className="text-lg mb-4 leading-relaxed text-white">
                    {testimonial.message}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        isClient
                          ? 'bg-white text-black'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{testimonial.author}</p>
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
