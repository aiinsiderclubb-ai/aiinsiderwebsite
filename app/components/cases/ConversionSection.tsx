'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Phone, Zap, Settings, MessageCircle } from 'lucide-react';

interface ConversionSectionProps {
  onOpenChat: () => void;
}

export default function ConversionSection({ onOpenChat }: ConversionSectionProps) {
  const benefits = [
    { icon: Bot, text: 'Custom AI logic tailored to your business' },
    { icon: MessageCircle, text: 'Chat + Voice agent integration' },
    { icon: Settings, text: 'CRM and tools integration' },
    { icon: Zap, text: 'Scalable solution that grows with you' },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Ready to Transform?</span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Want the same results
            <br />
            <span className="gradient-text">for your business?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            We build custom AI solutions that automate your workflows, 
            engage your customers, and grow your revenue.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-gray-300 text-left">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#bookcall"
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30"
            >
              <Phone className="w-5 h-5" />
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button
              onClick={onOpenChat}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              <MessageCircle className="w-5 h-5" />
              Discuss My Business
            </button>
          </div>

          {/* Trust text */}
          <p className="mt-8 text-sm text-gray-500">
            Free consultation • No commitment • Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}

