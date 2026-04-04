'use client';

import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Subtle background orbs — pure CSS */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb), 0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
          left: '20%',
          top: '20%',
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb), 0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
          right: '15%',
          top: '40%',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Top Badge */}
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-white/15 bg-white/[0.04] transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Zap className="w-5 h-5 text-white" fill="currentColor" />
          <span className="text-sm font-semibold text-white">
            {t('hero.badge')}
          </span>
          <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full border border-white/20">
            Live
          </span>
        </div>

        <p
          className={`mx-auto mb-6 max-w-2xl text-sm md:text-base font-medium text-gray-300 transition-all duration-700 delay-[250ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {t('hero.descriptor')}
        </p>

        {/* Main Heading */}
        <h1
          className={`text-4xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[0.9] transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-white">
            {t('hero.title1')}
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-9xl gradient-text"
          >
            {t('hero.title2')}
          </span>
        </h1>

        {/* Subtitle with Tags */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 text-lg md:text-2xl text-gray-400 mb-10 max-w-4xl mx-auto transition-all duration-700 delay-[400ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span>{t('hero.subtitle')}</span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/15 font-semibold">
            {t('hero.tag1')}
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/15 font-semibold">
            {t('hero.tag2')}
          </span>
          <span className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/15 font-semibold">
            {t('hero.tag3')}
          </span>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mb-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { value: '70%', labelKey: 'hero.stat1Label' },
            { value: '24/7', labelKey: 'hero.stat2Label' },
            { value: '10x', labelKey: 'hero.stat3Label' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col items-center gap-8 transition-all duration-700 delay-[600ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group relative px-10 py-5 text-lg active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta1')}
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </a>

            <a
              href={`${basePath}/solutions`}
              className="btn-secondary group px-10 py-5 text-lg active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                {t('hero.cta2')}
                <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          {!shouldReduceMotion && (
            <div className="flex flex-col items-center gap-2 animate-bounce-slow">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{t('hero.scroll')}</span>
              <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1 relative">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full mx-auto scroll-dot" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
