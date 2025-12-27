'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Sparkles, Zap, Rocket } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';

const plans = [
  {
    name: 'Starter',
    price: 'Custom',
    desc: 'Perfect for small automations',
    icon: Zap,
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    features: [
      'Simple workflow automation',
      'Basic AI integration',
      'Email support',
      '30-day setup',
      'Up to 1,000 operations/mo',
    ],
  },
  {
    name: 'Pro',
    price: 'Custom',
    desc: 'Custom AI agent for your business',
    icon: Rocket,
    gradient: 'from-violet-500 via-pink-500 to-orange-500',
    glowColor: 'rgba(153, 69, 255, 0.4)',
    features: [
      'Custom voice/chat agent',
      'Advanced AI models',
      'Priority support',
      'Full integration',
      '14-day setup',
      'Unlimited operations',
      'Dedicated account manager',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'End-to-end AI system',
    icon: Sparkles,
    gradient: 'from-yellow-400 via-green-400 to-cyan-400',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    features: [
      'Complete AI infrastructure',
      'Multiple agents & workflows',
      'Dedicated support team',
      'Custom model training',
      'SLA guarantee',
      'White-label solution',
      'Advanced analytics',
    ],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255, 0, 128, 0.2) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full mb-8 border border-white/10"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium gradient-text-animated">Pricing Plans</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
            <span className="block">Choose Your</span>
            <span className="block gradient-text-animated text-6xl md:text-8xl mt-2">Power Level</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            All plans are customized to your exact needs. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-sm font-bold z-10 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" fill="currentColor" />
                    MOST POPULAR
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className={`relative h-full p-8 glass-strong rounded-3xl overflow-hidden border-2 ${
                    plan.popular ? 'border-violet-500/50' : 'border-white/10'
                  }`}
                  animate={
                    hoveredIndex === index
                      ? { scale: 1.05, y: -10 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  {/* Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10`}
                    animate={
                      hoveredIndex === index
                        ? { opacity: 0.1 }
                        : { opacity: 0 }
                    }
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={
                      hoveredIndex === index
                        ? { boxShadow: `0 0 60px ${plan.glowColor}` }
                        : { boxShadow: 'none' }
                    }
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${plan.gradient}`}
                      animate={
                        hoveredIndex === index
                          ? { rotate: 360, scale: 1.1 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Plan Name */}
                    <h3 className="text-3xl font-bold font-heading mb-2">
                      {plan.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6">{plan.desc}</p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-bold gradient-text-animated">
                        {plan.price}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.a
                      href={SCHEDULING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-4 rounded-full font-bold text-center transition-all ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg`
                          : 'glass border border-white/20 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {plan.popular ? 'Start Now' : 'Get Started'}
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Need a custom solution? <a href="#contact" className="text-cyan-400 hover:underline font-semibold">Let's talk</a>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Swiss quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
