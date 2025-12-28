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
      {/* Background - Monochrome */}
      <div
        className="absolute inset-0 gpu-accelerated"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
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
          <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
            <span className="text-sm font-medium text-white">Get in Touch</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-white">
            Let's Build Something
            <span 
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Extraordinary
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-white/50 focus:outline-none transition-colors duration-200 text-white placeholder-gray-500"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-white/50 focus:outline-none transition-colors duration-200 text-white placeholder-gray-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 glass-strong rounded-xl border border-white/10 focus:border-white/50 focus:outline-none transition-colors duration-200 resize-none text-white placeholder-gray-500"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black rounded-full font-semibold text-lg flex items-center justify-center gap-2 
                  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>

              {/* Book Call Button */}
              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center w-full px-8 py-4 glass-strong border border-white/30 rounded-full font-semibold text-lg text-white
                  transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a Call
              </a>
            </form>
          </motion.div>

          {/* Contact Info - Monochrome */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Telegram Card */}
            <div className="glass-strong rounded-2xl p-6 border border-white/20" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Telegram</h3>
                  <p className="text-sm text-gray-400">Instant messaging</p>
                </div>
              </div>
              <a
                href="https://t.me/aiinsider"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                @aiinsider
              </a>
            </div>

            {/* Email Card */}
            <div className="glass-strong rounded-2xl p-6 border border-white/20" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-sm text-gray-400">For detailed inquiries</p>
                </div>
              </div>
              <a
                href="mailto:hello@aiinsider.com"
                className="text-white hover:underline"
              >
                hello@aiinsider.com
              </a>
            </div>

            {/* Info Box */}
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-white">Quick Response</h3>
              <p className="text-gray-400 mb-4">
                We typically respond within 24 hours. For urgent matters, reach out on Telegram.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Usually online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
