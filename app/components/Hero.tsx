'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useEffect, useState } from 'react';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return;

    let frame: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
        frame = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldReduceMotion]);

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
      
      {/* Animated Orbs - Monochrome */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
          left: '20%',
          top: '20%',
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 60%)',
          filter: 'blur(50px)',
          right: '10%',
          top: '40%',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
          left: '50%',
          bottom: '10%',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cursor Follow Glow - Monochrome */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 30%,
            rgba(255, 255, 255, 0.03) 60%,
            transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
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

      {/* Floating Particles - White */}
      {!shouldReduceMotion &&
        [...Array(8)].map((_, i) => {
          const xPos = (i * 12.5) + 5;
          const yPos = 50 + (i % 3) * 20;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full gpu-accelerated"
              style={{ left: `${xPos}%`, top: `${yPos}%` }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -200],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
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
            AI-Powered Automation
          </span>
          <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full border border-white/20">
            Live
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-heading mb-8 leading-[0.9]"
        >
          <span 
            className="block text-white"
            style={{ textShadow: '0 0 60px rgba(255, 255, 255, 0.3)' }}
          >
            Automation
          </span>
          <span 
            className="block text-7xl md:text-9xl lg:text-[12rem]"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Reimagined
          </span>
        </motion.h1>

        {/* Subtitle with Elegant Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto"
        >
          <span>AI systems that</span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            think
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            speak
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/20 font-semibold">
            act
          </span>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 mb-12"
        >
          {[
            { value: '70%', label: 'Time Saved' },
            { value: '24/7', label: 'AI Availability' },
            { value: '10x', label: 'Faster Response' },
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
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - Elegant Black & White */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
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
              Book an Intro Call
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
              Explore Solutions
              <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </span>
          </motion.a>
        </motion.div>

        {/* Bottom Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll to explore</span>
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
