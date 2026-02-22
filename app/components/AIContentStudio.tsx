'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Video, Sparkles, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/app/lib/LanguageContext';

const services = [
  {
    slug: 'ai-influencers',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
    emoji: '🎭',
    titleEn: 'AI Influencers',
    titleUk: 'AI-інфлюенсери',
    descEn: 'Virtual personas for your brand',
    descUk: 'Віртуальні персонажі для бренду',
  },
  {
    slug: 'ai-video-production',
    icon: Video,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    emoji: '🎬',
    titleEn: 'AI Video',
    titleUk: 'AI-відео',
    descEn: 'Videos without cameras or crews',
    descUk: 'Відео без камер і команд',
  },
  {
    slug: 'ai-ugc-content',
    icon: Sparkles,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/20 to-red-500/20',
    emoji: '⚡',
    titleEn: 'AI UGC',
    titleUk: 'AI UGC',
    descEn: 'UGC ads at scale',
    descUk: 'UGC-реклама у масштабі',
  },
];

export default function AIContentStudio() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.3) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
              {isEn ? 'New: AI Content Studio' : 'Нове: AI Контент-Студія'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.1]">
            {isEn ? 'AI-Powered ' : 'AI-контент '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isEn ? 'Content Creation' : 'для маркетингу'}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {isEn
              ? 'AI influencers, video production, and UGC ads — without shoots, creators, or content bottlenecks'
              : 'AI-інфлюенсери, відеопродакшн та UGC-реклама — без зйомок, креаторів та контентних "затичок"'}
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link href={`${basePath}/services/${service.slug}`} className="group block h-full">
                  <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-xl">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />
                    
                    {/* Emoji background */}
                    <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {service.emoji}
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {isEn ? service.titleEn : service.titleUk}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">
                      {isEn ? service.descEn : service.descUk}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                      {isEn ? 'Learn more' : 'Дізнатись більше'}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href={`${basePath}/ai-content-creation`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
          >
            {isEn ? 'Explore AI Content Studio' : 'Дізнатись більше про AI-контент'}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{isEn ? '10x content output' : 'у 10 разів більше контенту'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{isEn ? '5-10x cost savings' : 'у 5-10 разів дешевше'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{isEn ? '10+ languages' : '10+ мов'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
