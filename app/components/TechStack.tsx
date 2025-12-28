'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const technologies = [
  { 
    name: 'Telegram', 
    logo: 'https://cdn.simpleicons.org/telegram/FFFFFF',
    url: 'https://telegram.org/',
  },
  { 
    name: 'ElevenLabs', 
    logo: 'https://cdn.simpleicons.org/elevenlabs/FFFFFF',
    url: 'https://elevenlabs.io/',
  },
  { 
    name: 'Docker', 
    logo: 'https://cdn.simpleicons.org/docker/FFFFFF',
    url: 'https://www.docker.com/',
  },
  { 
    name: 'Supabase', 
    logo: 'https://cdn.simpleicons.org/supabase/FFFFFF',
    url: 'https://supabase.com/',
  },
  { 
    name: 'FastAPI', 
    logo: 'https://cdn.simpleicons.org/fastapi/FFFFFF',
    url: 'https://fastapi.tiangolo.com/',
  },
  { 
    name: 'Next.js', 
    logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
    url: 'https://nextjs.org/',
  },
  { 
    name: 'Zapier', 
    logo: 'https://cdn.simpleicons.org/zapier/FFFFFF',
    url: 'https://zapier.com/',
  },
  { 
    name: 'OpenAI', 
    logo: 'https://cdn.simpleicons.org/openai/FFFFFF',
    url: 'https://openai.com/',
  },
  { 
    name: 'n8n', 
    logo: 'https://cdn.simpleicons.org/n8n/FFFFFF',
    url: 'https://n8n.io/',
  },
  { 
    name: 'Make', 
    logo: 'https://cdn.simpleicons.org/make/FFFFFF',
    url: 'https://www.make.com/',
  },
  { 
    name: 'Python', 
    logo: 'https://cdn.simpleicons.org/python/FFFFFF',
    url: 'https://www.python.org/',
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.simpleicons.org/typescript/FFFFFF',
    url: 'https://www.typescriptlang.org/',
  },
];

// Утроим массив для бесшовной анимации
const duplicatedTechnologies = [...technologies, ...technologies, ...technologies];

export default function TechStack() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background - Monochrome */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
      />

      <div className="relative">
        {/* Header - Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-3 glass-strong rounded-full mb-8 border border-white/20"
          >
            <span className="text-sm font-medium text-white">Technology Stack</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-white">
            Powered by
          </h2>
          <h2 
            className="text-6xl md:text-8xl font-bold font-heading mb-8"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Best-in-Class Tools
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We work with industry-leading platforms to deliver reliable, scalable AI solutions.
          </p>
        </motion.div>

        {/* Infinite Scrolling - Monochrome */}
        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Single Row - CSS Animation */}
          <div 
            className="overflow-hidden py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex gap-5"
              style={{
                animation: 'marquee 40s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'max-content',
              }}
            >
              {duplicatedTechnologies.map((tech, index) => (
                <a
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                  href={(tech as { url: string }).url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-40 h-28 glass-strong rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-white/10 hover:border-white/30 transition-all overflow-hidden gpu-accelerated">
                    {/* Gradient Background on Hover - Monochrome */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Logo */}
                    <div className="relative w-14 h-14 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={56}
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-xs font-semibold text-center relative z-10 text-gray-300 group-hover:text-white transition-colors">{tech.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
