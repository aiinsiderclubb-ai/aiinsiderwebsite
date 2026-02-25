'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles, Zap, Rocket, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const plans = [
    {
      name: 'Starter',
      price: '€399',
      priceNote: t('pricing.perMonth'),
      descKey: 'pricing.starterDesc',
      icon: Zap,
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      accentColor: 'blue',
      badge: isEn ? 'Quick Start' : 'Швидкий старт',
      featureKeys: [
        'pricing.starterF1',
        'pricing.starterF2',
        'pricing.starterF3',
        'pricing.starterF4',
        'pricing.starterF5',
      ],
    },
    {
      name: 'Pro',
      price: '€899',
      priceNote: t('pricing.perMonth'),
      descKey: 'pricing.proDesc',
      icon: Rocket,
      gradient: 'from-purple-500/30 via-pink-500/20 to-transparent',
      accentColor: 'purple',
      badge: isEn ? 'Best Value' : 'Найкраще',
      featureKeys: [
        'pricing.proF1',
        'pricing.proF2',
        'pricing.proF3',
        'pricing.proF4',
        'pricing.proF5',
        'pricing.proF6',
        'pricing.proF7',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: t('pricing.enterprisePrice'),
      priceNote: '',
      descKey: 'pricing.enterpriseDesc',
      icon: Sparkles,
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accentColor: 'amber',
      badge: isEn ? 'Full Scale' : 'Повний масштаб',
      featureKeys: [
        'pricing.entF1',
        'pricing.entF2',
        'pricing.entF3',
        'pricing.entF4',
        'pricing.entF5',
        'pricing.entF6',
        'pricing.entF7',
      ],
    },
  ];

  const trustBadges = [
    { icon: Shield, label: isEn ? 'No hidden fees' : 'Без прихованих платежів' },
    { icon: Clock, label: isEn ? 'Cancel anytime' : 'Скасування будь-коли' },
    { icon: Star, label: isEn ? 'Swiss quality' : 'Швейцарська якість' },
  ];

  return (
    <section id="pricing" className="relative py-24 px-6 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header — Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Animated badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">{t('pricing.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.1]">
            <span className="block text-white">{t('pricing.title1')}</span>
            <span
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 40%, #ffffff 60%, #888888 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('pricing.title2')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards — Premium Bento Design */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative group ${plan.popular ? 'md:-mt-3 md:mb-3' : ''}`}
              >
                {/* Popular Badge — Floating */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div
                      className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2"
                      style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(147, 51, 234, 0.3)' }}
                    >
                      <Sparkles className="w-4 h-4" fill="currentColor" />
                      {t('pricing.popular')}
                    </div>
                  </motion.div>
                )}

                {/* Outer glow on hover */}
                <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                {/* Card */}
                <div
                  className={`relative h-full rounded-[2rem] overflow-hidden border backdrop-blur-xl transition-all duration-500
                    ${plan.popular
                      ? 'border-white/30 bg-gradient-to-br from-white/[0.12] to-white/[0.04]'
                      : 'border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]'
                    }
                    hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.12)]`}
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient.replace('to-transparent', 'to-transparent')}`} />

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-30"
                    style={{
                      background: `radial-gradient(circle at top right, ${plan.popular ? 'rgba(147, 51, 234, 0.3)' : 'rgba(255,255,255,0.1)'} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 lg:p-8">
                    {/* Top row: Icon + Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                          ${plan.popular ? 'bg-white' : 'bg-white/10 border border-white/20'}`}
                        style={plan.popular ? { boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)' } : {}}
                      >
                        <Icon className={`w-6 h-6 ${plan.popular ? 'text-black' : 'text-white'}`} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        {plan.badge}
                      </span>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2 text-white">
                      {plan.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-5 leading-relaxed text-sm">{t(plan.descKey)}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-3xl md:text-4xl font-bold"
                          style={{
                            background: plan.popular
                              ? 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #ffffff 100%)'
                              : 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {plan.price}
                        </span>
                        {plan.priceNote && (
                          <span className="text-lg text-gray-400 font-medium">{plan.priceNote}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {plan.name === 'Enterprise' 
                          ? (isEn ? 'Custom pricing based on scope' : 'Індивідуальна ціна за обсягом')
                          : (isEn ? 'Starting price' : 'Стартова ціна')}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5" />

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.featureKeys.map((featureKey, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5
                            ${plan.popular ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/10 border border-white/20'}`}
                          >
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-purple-300' : 'text-white'}`} />
                          </div>
                          <span className="text-gray-300 leading-relaxed text-sm">{t(featureKey)}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={SCHEDULING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02]
                        ${plan.popular
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}
                      style={plan.popular ? { boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)' } : {}}
                    >
                      <span className="relative z-10">{plan.popular ? t('pricing.startNow') : t('pricing.getStarted')}</span>
                      <ArrowRight className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 ${plan.popular ? 'text-black' : 'text-white'}`} />
                      {/* Shine effect for popular */}
                      {plan.popular && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      )}
                    </a>
                  </div>

                  {/* Bottom corner decoration */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section — Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14"
        >
          {/* Custom solution note */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-base">
              {t('pricing.needCustom')}{' '}
              <a href="#contact" className="text-white font-semibold hover:underline underline-offset-4 transition-all">
                {t('pricing.letsTalk')} →
              </a>
            </p>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <BadgeIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
