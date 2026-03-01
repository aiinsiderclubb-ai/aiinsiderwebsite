'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Sparkles, ArrowRight, CheckCircle2, Zap, Rocket, Star, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const journeySteps = [
  {
    step: 1,
    icon: Target,
    phaseKey: 'testimonials.phase1',
    testimonial: {
      quoteKey: 'testimonials.quote1',
      author: 'Sarah Johnson',
      role: 'CEO',
      companyKey: 'testimonials.company1',
    },
    resultKey: 'testimonials.result1',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    step: 2,
    icon: Zap,
    phaseKey: 'testimonials.phase2',
    testimonial: {
      quoteKey: 'testimonials.quote2',
      author: 'Michael Chen',
      role: 'Head of Sales',
      companyKey: 'testimonials.company2',
    },
    resultKey: 'testimonials.result2',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    accentColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    step: 3,
    icon: Rocket,
    phaseKey: 'testimonials.phase3',
    testimonial: {
      quoteKey: 'testimonials.quote3',
      author: 'Emma Williams',
      role: 'Operations Director',
      companyKey: 'testimonials.company3',
    },
    resultKey: 'testimonials.result3',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    step: 4,
    icon: Star,
    phaseKey: 'testimonials.phase4',
    testimonial: {
      quoteKey: 'testimonials.quote4',
      author: 'David Mueller',
      role: 'Founder',
      companyKey: 'testimonials.company4',
    },
    resultKey: 'testimonials.result4',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'rgba(245, 158, 11, 0.4)',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{t('testimonials.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-5 text-white">
            {t('testimonials.title1')}
            <span
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('testimonials.title2')}
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {journeySteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative group"
              >
                {/* Outer glow on hover */}
                <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative h-full rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.1)]">
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient}`} />

                  {/* Decorative corner */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-30"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.accentColor} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 lg:p-7 flex flex-col h-full">
                    {/* Header: Phase + Step */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                          {t(item.phaseKey)}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        {item.step}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex-1">
                      <Quote className="w-6 h-6 mb-3 text-white/20" />
                      <p className="text-lg font-medium text-white leading-relaxed mb-5">
                        &ldquo;{t(item.testimonial.quoteKey)}&rdquo;
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4" />

                    {/* Author + Result */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                          {item.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{item.testimonial.author}</p>
                          <p className="text-xs text-gray-500">{item.testimonial.role}, {t(item.testimonial.companyKey)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs text-green-400 font-medium whitespace-nowrap">{t(item.resultKey)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom corner decoration */}
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href="#bookcall"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 relative"
            style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.25)' }}
          >
            <span className="relative z-10">{t('testimonials.ctaButton')}</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
