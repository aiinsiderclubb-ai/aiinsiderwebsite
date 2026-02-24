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
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
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

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Central Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-white/30 via-white/20 to-white/10"
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-white/30 via-white/20 to-white/10"
            />
          </div>

          {/* Journey Steps */}
          <div className="space-y-16 lg:space-y-24">
            {journeySteps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Timeline Node - Desktop */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="relative"
                    >
                      {/* Outer glow ring */}
                      <div 
                        className="absolute inset-0 w-16 h-16 rounded-full animate-pulse"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                        }}
                      />
                      {/* Main node */}
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <span className="text-black font-bold text-xl">{item.step}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Node - Mobile */}
                  <div className="lg:hidden absolute left-8 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                      <span className="text-black font-bold text-lg">{item.step}</span>
                    </motion.div>
                  </div>

                  {/* Content Card - Left or Right based on index */}
                  <div className={`lg:pl-0 pl-20 ${isEven ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:col-start-2 lg:text-left'}`}>
                    {/* Phase Label */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                      className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        {t(item.phaseKey)}
                      </span>
                    </motion.div>

                    {/* Testimonial Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      className="relative group"
                    >
                      <div 
                        className="relative p-6 lg:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm
                          transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                      >
                        {/* Quote Icon */}
                        <Quote className="w-8 h-8 mb-4 text-white/30" />

                        {/* Quote Text */}
                        <p className={`text-xl lg:text-2xl font-medium text-white leading-relaxed mb-6 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                          "{t(item.testimonial.quoteKey)}"
                        </p>

                        {/* Author */}
                        <div className={`flex items-center gap-4 ${isEven ? 'lg:justify-end lg:flex-row-reverse' : ''}`}>
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg">
                            {item.testimonial.author.charAt(0)}
                          </div>
                          <div className={isEven ? 'lg:text-right' : ''}>
                            <p className="font-semibold text-white">{item.testimonial.author}</p>
                            <p className="text-sm text-gray-400">{item.testimonial.role}, {t(item.testimonial.companyKey)}</p>
                          </div>
                        </div>

                        {/* Result Badge */}
                        <div className={`mt-6 pt-6 border-t border-white/10 flex items-center gap-2 ${isEven ? 'lg:justify-end' : ''}`}>
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">{t(item.resultKey)}</span>
                        </div>

                        {/* Decorative corner gradient */}
                        <div 
                          className={`absolute top-0 ${isEven ? 'right-0 rounded-tr-3xl' : 'left-0 rounded-tl-3xl'} w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          style={{
                            background: `radial-gradient(circle at ${isEven ? 'top right' : 'top left'}, rgba(255,255,255,0.05) 0%, transparent 70%)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout - Desktop only */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`} />
                </motion.div>
              );
            })}
          </div>

          {/* Final CTA Node */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative mt-20 pt-12"
          >
            {/* Connection line to CTA */}
            <div className="hidden lg:block absolute left-1/2 -top-4 w-px h-16 -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-8 shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <Sparkles className="w-10 h-10 text-black" />
              </motion.div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t('testimonials.ctaTitle')}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {t('testimonials.ctaSubtitle')}
              </p>
              
              <a
                href="#bookcall"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                  transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {t('testimonials.ctaButton')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
