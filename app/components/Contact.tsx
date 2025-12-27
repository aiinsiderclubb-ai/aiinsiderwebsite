'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MessageCircle, Mail } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 glass rounded-full mb-6"
          >
            <span className="text-sm font-medium gradient-text">Get in Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Let's Build Something
            <span className="block gradient-text mt-2">Extraordinary</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-accent-cyan focus:outline-none smooth-transition"
                  placeholder="Your name"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-accent-cyan focus:outline-none smooth-transition"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-accent-cyan focus:outline-none smooth-transition resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent-cyan/50 smooth-transition"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>

              {/* Book Call Button */}
              <motion.a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 block text-center w-full px-8 py-4 glass-strong border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 smooth-transition"
              >
                Book a Call
              </motion.a>
            </form>
          </motion.div>

          {/* Contact Info & Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong neon-border-cyan rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Telegram</h3>
                  <p className="text-sm text-gray-400">Instant messaging</p>
                </div>
              </div>
              <a
                href="https://t.me/aiinsider"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                @aiinsider
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong neon-border-violet rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-gray-400">For detailed inquiries</p>
                </div>
              </div>
              <a
                href="mailto:hello@aiinsider.com"
                className="text-accent-violet hover:underline"
              >
                hello@aiinsider.com
              </a>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-3">Quick Response</h3>
              <p className="text-gray-300 mb-4">
                We typically respond within 24 hours. For urgent matters, reach out on Telegram.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Usually online</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

