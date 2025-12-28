'use client';

import { motion } from 'framer-motion';
import { Youtube, Linkedin, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/aiinsider',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@aiinsider',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/aiinsider',
    },
  ];

  return (
    <footer className="relative py-20 px-6 overflow-hidden border-t border-white/10">
      {/* Gradient Line - Monochrome */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Background Glow - Monochrome */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full gpu-accelerated"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 0%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold font-heading text-white mb-4">
                AI Insider
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md">
                We build AI systems that think, speak, and act — transforming businesses with intelligent automation and voice agents.
              </p>
            </motion.div>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <MapPin className="w-5 h-5 text-white" />
              <span>Based in <span className="text-white font-semibold">Switzerland</span> — Working globally</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Solutions', 'Case Studies', 'Pricing', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4 text-white">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@aiinsider.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                hello@aiinsider.com
              </a>
              <a
                href="https://t.me/aiinsider"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                @aiinsider
              </a>
            </div>
          </div>
        </div>

        {/* Social Links - Monochrome */}
        <div className="flex items-center justify-center gap-6 py-8 border-t border-white/10">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center border border-white/10 
                  transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-white/30 text-white">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Hover Glow - Monochrome */}
                <div
                  className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-200 -z-10"
                />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">
            © 2025 AI Insider — <span className="text-white font-semibold">Built with intelligence, not templates.</span>
          </p>
          <p className="text-xs">
            All rights reserved. Made with ❤️ in Switzerland.
          </p>
        </div>
      </div>
    </footer>
  );
}
