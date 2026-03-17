'use client';

import { Check, Sparkles, Zap, Rocket, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';

export default function Pricing() {
  const { ref, isVisible } = useReveal();
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const plans = [
    {
      name: 'Starter',
      price: '€399',
      priceNote: '',
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
      priceNote: '',
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
    <section id="pricing" className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">{t('pricing.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.1]">
            <span className="block text-white">{t('pricing.title1')}</span>
            <span className="block mt-2 gradient-text">
              {t('pricing.title2')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`reveal reveal-delay-${index + 1} ${isVisible ? 'visible' : ''} relative group ${plan.popular ? 'md:-mt-3 md:mb-3' : ''}`}
              >
                {plan.popular && (
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 z-20 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
                    <div
                      className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2"
                      style={{ boxShadow: 'var(--theme-shadow-glow)' }}
                    >
                      <Sparkles className="w-4 h-4" fill="currentColor" />
                      {t('pricing.popular')}
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-[2rem] overflow-hidden border transition-all duration-300
                    ${plan.popular
                      ? 'border-white/25 bg-gradient-to-br from-white/[0.10] to-white/[0.03]'
                      : 'border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01]'
                    }
                    hover:border-white/30 hover:-translate-y-1`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient.replace('to-transparent', 'to-transparent')}`} />

                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${plan.popular ? 'rgba(147, 51, 234, 0.3)' : 'rgba(255,255,255,0.08)'} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110
                          ${plan.popular ? 'bg-white' : 'bg-white/10 border border-white/15'}`}
                        style={plan.popular ? { boxShadow: 'var(--theme-shadow-glow)' } : {}}
                      >
                        <Icon className={`w-6 h-6 ${plan.popular ? 'text-black' : 'text-white'}`} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        {plan.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 mb-5 leading-relaxed text-sm">{t(plan.descKey)}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-bold text-white">
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {plan.name === 'Enterprise'
                          ? (isEn ? 'Custom pricing based on scope' : 'Індивідуальна ціна за обсягом')
                          : (isEn ? 'Starting price' : 'Стартова ціна')}
                      </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-5" />

                    <ul className="space-y-3 mb-6">
                      {plan.featureKeys.map((featureKey, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5
                            ${plan.popular ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/10 border border-white/15'}`}
                          >
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-purple-300' : 'text-white'}`} />
                          </div>
                          <span className="text-gray-300 leading-relaxed text-sm">{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={SCHEDULING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02]
                        ${plan.popular
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25'
                        }`}
                      style={plan.popular ? { boxShadow: 'var(--theme-shadow-glow)' } : {}}
                    >
                      <span className="relative z-10">{plan.popular ? t('pricing.startNow') : t('pricing.getStarted')}</span>
                      <ArrowRight className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 ${plan.popular ? 'text-black' : 'text-white'}`} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className={`mt-14 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <div className="text-center mb-6">
            <p className="text-gray-400 text-base">
              {t('pricing.needCustom')}{' '}
              <a href="#contact" className="text-white font-semibold hover:underline underline-offset-4 transition-all">
                {t('pricing.letsTalk')} →
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <BadgeIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
