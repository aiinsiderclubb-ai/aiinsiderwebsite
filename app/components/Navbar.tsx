'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Cases', href: '#cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Book Call', href: '#bookcall' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
      style={{ 
        opacity,
        backdropFilter: isScrolled ? `blur(${blur}px)` : 'none',
      }}
    >
      {/* Background with gradient border */}
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 glass-strong border-b border-white/10"
        >
          {/* Animated gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500"
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Optimized */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-violet-500 to-pink-500 flex items-center justify-center
              transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          >
            <Zap className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          
          <span className="text-2xl font-bold font-heading">
            <span className="gradient-text">AI Insider</span>
          </span>
        </Link>

        {/* Desktop Navigation - Optimized */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              {link.name}
              
              {/* Underline effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          
          {/* CTA Button - Optimized */}
          <motion.a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-full font-bold text-sm overflow-hidden group"
            style={{
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(153, 69, 255, 0.25)',
            }}
          >
            <span className="relative z-10">Book a Call</span>
            
            {/* Hover effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 rounded-lg glass-strong border border-white/20 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6"
        >
          <div className="glass-strong rounded-2xl p-6 border border-white/10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-300 hover:text-white font-semibold transition-colors border-b border-white/5 last:border-0"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full font-bold text-center"
            >
              Book a Call
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
