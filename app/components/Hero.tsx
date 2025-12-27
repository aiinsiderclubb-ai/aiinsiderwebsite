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
      {/* Animated Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Multiple Animated Orbs - GPU accelerated with reduced blur */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.35) 0%, transparent 60%)',
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
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.25) 0%, transparent 60%)',
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
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 60%)',
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
      
      {/* Cursor Follow Glow with Multiple Colors */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, 
            rgba(0, 240, 255, 0.3) 0%, 
            rgba(153, 69, 255, 0.2) 30%,
            rgba(255, 0, 128, 0.1) 60%,
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

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(153, 69, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Floating Particles - More and Colorful */}
      {!shouldReduceMotion &&
        [...Array(20)].map((_, i) => {
          const colors = [
            'bg-cyan-400',
            'bg-violet-500',
            'bg-pink-500',
            'bg-yellow-400',
          ];
          const randomColor = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${randomColor} rounded-full`}
              initial={{
                x:
                  typeof window !== 'undefined'
                    ? Math.random() * window.innerWidth
                    : Math.random() * 1920,
                y:
                  typeof window !== 'undefined'
                    ? Math.random() * window.innerHeight
                    : Math.random() * 1080,
                opacity: 0,
              }}
              animate={{
                y: [null, -Math.random() * 300 - 150],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
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
        {/* Top Badge with Glow */}
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-3 glass-strong px-6 py-3 rounded-full mb-8 neon-multi border border-white/10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
          </motion.div>
          <span className="text-sm font-semibold">
            <span className="gradient-text-animated">AI-Powered Automation</span>
          </span>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
            Live
          </span>
        </motion.div>

        {/* Main Heading - Optimized */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-heading mb-8 leading-[0.9]"
        >
          <span 
            className="block"
            style={{ textShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}
          >
            Automation
          </span>
          <span className="block gradient-text-animated text-7xl md:text-9xl lg:text-[12rem]">
            Reimagined
          </span>
        </motion.h1>

        {/* Subtitle with Icons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto"
        >
          <span>AI systems that</span>
          <span className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
            think
          </span>
          <span className="px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/30 font-semibold">
            speak
          </span>
          <span className="px-4 py-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30 font-semibold">
            act
          </span>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 mb-12"
        >
          {[
            { value: '70%', label: 'Time Saved', color: 'cyan' },
            { value: '24/7', label: 'AI Availability', color: 'violet' },
            { value: '10x', label: 'Faster Response', color: 'pink' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold gradient-text-${stat.color === 'cyan' ? 'animated' : stat.color === 'violet' ? '' : 'green'}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - More Vibrant */}
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
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-full font-bold text-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="relative z-10 flex items-center gap-3">
              Book an Intro Call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            
            {/* Static Glow - no animation for performance */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4), 0 0 50px rgba(153, 69, 255, 0.25)',
              }}
            />
          </motion.a>

          <motion.a
            href="#solutions"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 glass-strong border-2 border-white/20 rounded-full font-bold text-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all duration-300"
          >
            <span className="flex items-center gap-3">
              Explore Solutions
              <Sparkles className="w-6 h-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
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
            <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full p-1 relative">
              <motion.div
                animate={{ 
                  y: [0, 16, 0],
                  opacity: [1, 0, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full mx-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
