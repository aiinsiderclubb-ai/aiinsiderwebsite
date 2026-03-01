'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CasesCarouselProps {
  cases: CaseStudy[];
  onDemoClick: (caseData: CaseStudy) => void;
}

const categoryColors: Record<string, { gradient: string; glow: string; accent: string }> = {
  ecommerce: { gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.4)', accent: '#10b981' },
  beauty: { gradient: 'from-pink-500 to-rose-500', glow: 'rgba(236, 72, 153, 0.4)', accent: '#ec4899' },
  realestate: { gradient: 'from-blue-500 to-indigo-500', glow: 'rgba(59, 130, 246, 0.4)', accent: '#3b82f6' },
  voice: { gradient: 'from-violet-500 to-purple-500', glow: 'rgba(139, 92, 246, 0.4)', accent: '#8b5cf6' },
  automation: { gradient: 'from-orange-500 to-amber-500', glow: 'rgba(249, 115, 22, 0.4)', accent: '#f97316' },
  social: { gradient: 'from-cyan-500 to-blue-500', glow: 'rgba(6, 182, 212, 0.4)', accent: '#06b6d4' },
};

export default function CasesCarousel({ cases, onDemoClick }: CasesCarouselProps) {
  const { lang, t } = useLanguage();
  const basePath = `/${lang}`;
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((direction: 'left' | 'right') => {
    setActiveIndex((prev) => {
      if (direction === 'right') return Math.min(prev + 1, cases.length - 1);
      return Math.max(prev - 1, 0);
    });
  }, [cases.length]);

  const visibleCount = 5;
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;

    if (offset < -1 || offset > visibleCount - 2) {
      return { opacity: 0, scale: 0.8, x: offset < 0 ? -600 : 600, zIndex: 0, rotateY: 0 };
    }

    if (offset === 0) {
      return { opacity: 1, scale: 1, x: 0, zIndex: 30, rotateY: 0 };
    }

    if (offset === -1) {
      return { opacity: 0.5, scale: 0.88, x: -320, zIndex: 20, rotateY: 8 };
    }

    if (offset === 1) {
      return { opacity: 0.7, scale: 0.92, x: 340, zIndex: 25, rotateY: -5 };
    }

    if (offset === 2) {
      return { opacity: 0.4, scale: 0.84, x: 580, zIndex: 15, rotateY: -8 };
    }

    if (offset === 3) {
      return { opacity: 0.2, scale: 0.78, x: 740, zIndex: 10, rotateY: -10 };
    }

    return { opacity: 0, scale: 0.75, x: offset > 0 ? 800 : -500, zIndex: 0, rotateY: 0 };
  };

  const activeCase = cases[activeIndex];
  const activeColors = categoryColors[activeCase?.category] || categoryColors.automation;

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="absolute -top-16 right-0 flex items-center gap-3 z-10">
        <span className="text-sm text-gray-500 mr-2">
          {activeIndex + 1} / {cases.length}
        </span>
        <button
          onClick={() => navigate('left')}
          disabled={activeIndex === 0}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            activeIndex > 0
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('right')}
          disabled={activeIndex === cases.length - 1}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            activeIndex < cases.length - 1
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Card stack area */}
      <div className="relative h-[520px] flex items-center justify-center" style={{ perspective: 1200 }}>
        {/* Background glow that follows active card */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${activeColors.glow.replace('0.4', '0.15')} 0%, transparent 60%)`,
          }}
        />

        {cases.map((caseData, index) => {
          const colors = categoryColors[caseData.category] || categoryColors.automation;
          const isSweezy = caseData.id === 'case-sweezy';
          const isActive = index === activeIndex;
          const style = getCardStyle(index);
          const topResults = caseData.results.slice(0, 2);

          return (
            <motion.div
              key={caseData.id}
              className="absolute w-[380px] md:w-[420px] cursor-pointer"
              animate={{
                opacity: style.opacity,
                scale: style.scale,
                x: style.x,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                href={`${basePath}/cases/${caseData.slug}`}
                className={`block h-full group ${!isActive ? 'pointer-events-none' : ''}`}
                tabIndex={isActive ? 0 : -1}
              >
                {/* Card */}
                <div
                  className={`relative h-full rounded-[1.5rem] border overflow-hidden transition-all duration-500 ${
                    isSweezy
                      ? 'bg-gradient-to-br from-blue-950/80 to-yellow-950/60 border-blue-500/40'
                      : 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/15'
                  } ${isActive ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-black/30'}`}
                >
                  {/* Top gradient line */}
                  <div className={`h-1 bg-gradient-to-r ${isSweezy ? 'from-blue-500 to-yellow-500' : colors.gradient}`} />

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                            isSweezy
                              ? 'bg-gradient-to-br from-blue-500/30 to-yellow-500/30 border border-blue-400/40'
                              : `bg-gradient-to-br ${colors.gradient}`
                          }`}
                          style={!isSweezy ? { boxShadow: `0 6px 20px ${colors.glow}` } : {}}
                        >
                          {caseData.icon}
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block"
                            style={{ color: isSweezy ? '#60a5fa' : colors.accent }}
                          >
                            {getLocalizedText(caseData.industryName, lang)}
                          </span>
                          {caseData.featured && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              <span className="text-[9px] font-bold text-yellow-400 uppercase">
                                {t('cases.featured')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2">
                      {getLocalizedText(caseData.title, lang)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {getLocalizedText(caseData.shortDescription, lang)}
                    </p>

                    {/* Results */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topResults.map((result, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10"
                        >
                          <TrendingUp className="w-3.5 h-3.5" style={{ color: isSweezy ? '#60a5fa' : colors.accent }} />
                          <span className="text-sm font-bold text-white">
                            {result.prefix}{result.value}{result.suffix}
                          </span>
                          <span className="text-[10px] text-gray-500">{getLocalizedText(result.label, lang)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {caseData.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/8"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseData.technologies.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/8">
                          +{caseData.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onDemoClick(caseData);
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                        isSweezy
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : `bg-gradient-to-r ${colors.gradient} text-white`
                      }`}
                      style={!isSweezy ? { boxShadow: `0 4px 16px ${colors.glow}` } : {}}
                    >
                      {caseData.ctas[0]?.icon}
                      <span>{getLocalizedText(caseData.ctas[0]?.label, lang)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-white w-8'
                : index > activeIndex - 3 && index < activeIndex + 3
                  ? 'bg-white/30 w-1.5 hover:bg-white/50'
                  : 'bg-white/15 w-1 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
