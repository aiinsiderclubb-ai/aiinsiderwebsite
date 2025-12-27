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
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background - no animation */}
      <div
        className="absolute inset-0 gpu-accelerated"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 glass rounded-full mb-6">
            <span className="text-sm font-medium gradient-text">Get in Touch</span>
          </div>

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
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full font-semibold text-lg flex items-center justify-center gap-2 
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>

              {/* Book Call Button */}
              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center w-full px-8 py-4 glass-strong border border-white/20 rounded-full font-semibold text-lg 
                  transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a Call
              </a>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Telegram Card */}
            <div className="glass-strong rounded-2xl p-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
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
                className="text-cyan-400 hover:underline"
              >
                @aiinsider
              </a>
            </div>

            {/* Email Card */}
            <div className="glass-strong rounded-2xl p-6 border border-violet-500/30 shadow-[0_0_15px_rgba(153,69,255,0.15)]">
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
                className="text-violet-400 hover:underline"
              >
                hello@aiinsider.com
              </a>
            </div>

            {/* Info Box */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Quick Response</h3>
              <p className="text-gray-300 mb-4">
                We typically respond within 24 hours. For urgent matters, reach out on Telegram.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Usually online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
