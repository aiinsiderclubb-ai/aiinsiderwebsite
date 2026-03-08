'use client';

import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const MOUSE_THROTTLE_MS = 120;
const PARTICLES_COUNT = 4;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const lastUpdate = useRef(0);
  const rafId = useRef<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return;

    // Initialize to center so the first paint looks correct
    cursorX.set(window.innerWidth / 2 - 250);
    cursorY.set(window.innerHeight / 2 - 250);

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate.current < MOUSE_THROTTLE_MS) return;

      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
      rafId.current = window.requestAnimationFrame(() => {
        lastUpdate.current = now;
        cursorX.set(e.clientX - 250);
        cursorY.set(e.clientY - 250);
        rafId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated Orbs - Monochrome (will-change for GPU layer) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
          left: '20%',
          top: '20%',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 60%)',
          filter: 'blur(50px)',
          right: '10%',
          top: '40%',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
          left: '50%',
          bottom: '10%',
          willChange: 'transform',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Cursor Follow Glow - Monochrome (throttled updates) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.03) 60%, transparent 70%)',
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            willChange: 'transform',
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Grid Pattern - Monochrome */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating Particles - White (reduced for performance) */}
      {!shouldReduceMotion &&
        [...Array(PARTICLES_COUNT)].map((_, i) => {
          const xPos = (i * 25) + 10;
          const yPos = 45 + (i % 2) * 30;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full gpu-accelerated"
              style={{ left: `${xPos}%`, top: `${yPos}%`, willChange: 'transform, opacity' }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -180],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut',
              }}
            />
          );
        })}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Top Badge */}
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-3 glass-strong px-6 py-3 rounded-full mb-8 border border-white/20"
          style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </motion.div>
          <span className="text-sm font-semibold text-white">
            {t('hero.badge')}
          </span>
          <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full border border-white/20">
            Live
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[0.9]"
        >
          <span 
            className="block text-white"
            style={{ textShadow: '0 0 60px rgba(255, 255, 255, 0.3)' }}
          >
            {t('hero.title1')}
          </span>
          <span 
            className="block text-6xl md:text-8xl lg:text-9xl"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('hero.title2')}
          </span>
        </motion.h1>

        {/* Subtitle with Elegant Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 text-lg md:text-2xl text-gray-400 mb-10 max-w-4xl mx-auto"
        >
          <span>{t('hero.subtitle')}</span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            {t('hero.tag1')}
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            {t('hero.tag2')}
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            {t('hero.tag3')}
          </span>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          {[
            { value: '70%', labelKey: 'hero.stat1Label' },
            { value: '24/7', labelKey: 'hero.stat2Label' },
            { value: '10x', labelKey: 'hero.stat3Label' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div 
                className="text-3xl md:text-4xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{t(stat.labelKey)}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons + Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300"
              style={{
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.25)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta1')}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#solutions"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 glass-strong border border-white/30 rounded-full font-bold text-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300"
            >
              <span className="flex items-center gap-3 text-white">
                {t('hero.cta2')}
                <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              </span>
            </motion.a>
          </div>

          {/* Scroll Indicator centered under buttons */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('hero.scroll')}</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 relative">
              <motion.div
                animate={{ 
                  y: [0, 16, 0],
                  opacity: [1, 0, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
