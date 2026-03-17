'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';

const technologies = [
  { name: 'Telegram', logo: 'https://cdn.simpleicons.org/telegram/FFFFFF', url: 'https://telegram.org/' },
  { name: 'ElevenLabs', logo: 'https://cdn.simpleicons.org/elevenlabs/FFFFFF', url: 'https://elevenlabs.io/' },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/FFFFFF', url: 'https://www.docker.com/' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/FFFFFF', url: 'https://supabase.com/' },
  { name: 'FastAPI', logo: 'https://cdn.simpleicons.org/fastapi/FFFFFF', url: 'https://fastapi.tiangolo.com/' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF', url: 'https://nextjs.org/' },
  { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier/FFFFFF', url: 'https://zapier.com/' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/FFFFFF', url: 'https://openai.com/' },
  { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n/FFFFFF', url: 'https://n8n.io/' },
  { name: 'Make', logo: 'https://cdn.simpleicons.org/make/FFFFFF', url: 'https://www.make.com/' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python/FFFFFF', url: 'https://www.python.org/' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/FFFFFF', url: 'https://www.typescriptlang.org/' },
];

const duplicatedTechnologies = [...technologies, ...technologies, ...technologies];

export default function TechStack() {
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isVisible } = useReveal();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <section className="relative py-24 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="relative">
        <div ref={ref} className={`text-center mb-16 px-6 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-6 py-3 rounded-full mb-8 border border-white/15 bg-white/[0.04]">
            <span className="text-sm font-medium text-white">
              {isEn ? 'Technology Stack' : 'Технологічний стек'}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-5 text-white">
            {isEn ? 'Powered by' : 'Працюємо на'}
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 gradient-text">
            {isEn ? 'Best-in-Class Tools' : 'найкращих інструментах'}
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {isEn
              ? 'We work with industry-leading platforms to deliver reliable, scalable AI solutions.'
              : 'Ми використовуємо індустріальні платформи, щоб створювати надійні та масштабовані AI‑рішення.'}
          </p>
        </div>

        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

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
                  className="flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-40 h-28 rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all overflow-hidden gpu-accelerated">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-14 h-14 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image src={tech.logo} alt={tech.name} width={56} height={56} className="object-contain" unoptimized />
                    </div>
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
