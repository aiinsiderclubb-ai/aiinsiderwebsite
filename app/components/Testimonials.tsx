'use client';

import { Quote, Sparkles, ArrowRight, CheckCircle2, Zap, Rocket, Star, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';

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
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb),0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/15 bg-white/[0.04]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{t('testimonials.badge')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-5 text-white">
            {t('testimonials.title1')}
            <span className="block mt-2 gradient-text">
              {t('testimonials.title2')}
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {journeySteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`reveal reveal-delay-${index + 1} ${isVisible ? 'visible' : ''} relative group`}
              >
                <div className="relative h-full rounded-[1.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient}`} />

                  <div
                    className="absolute top-0 right-0 w-28 h-28 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.accentColor} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 lg:p-7 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                          {t(item.phaseKey)}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                        {item.step}
                      </div>
                    </div>

                    <div className="flex-1">
                      <Quote className="w-6 h-6 mb-3 text-white/20" />
                      <p className="text-lg font-medium text-white leading-relaxed mb-5">
                        &ldquo;{t(item.testimonial.quoteKey)}&rdquo;
                      </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

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
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`mt-14 text-center reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <a
            href="#bookcall"
            className="btn-primary group relative px-10 py-5 text-lg"
          >
            <span className="relative z-10">{t('testimonials.ctaButton')}</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
