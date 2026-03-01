'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const isEn = lang === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = 420;
  const gap = 24;

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(newIndex, cases.length - 1));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => container.removeEventListener('scroll', checkScroll);
  }, [cases.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = cardWidth + gap;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute -top-16 right-0 flex items-center gap-3 z-10">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {cases.map((caseData, index) => {
          const colors = categoryColors[caseData.category] || categoryColors.automation;
          const isSweezy = caseData.id === 'case-sweezy';
          const isActive = index === activeIndex;
          const topResults = caseData.results.slice(0, 2);

          return (
            <motion.div
              key={caseData.id}
              className="flex-shrink-0 snap-center"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: isActive ? 1 : 0.95,
                filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
              }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`${basePath}/cases/${caseData.slug}`} className="block h-full group">
                {/* Spotlight glow for active card */}
                <div
                  className={`absolute -inset-4 rounded-[2rem] blur-2xl transition-opacity duration-500 ${
                    isActive ? 'opacity-60' : 'opacity-0'
                  }`}
                  style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)` }}
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-[1.5rem] border overflow-hidden transition-all duration-500 ${
                    isSweezy
                      ? 'bg-gradient-to-br from-blue-950/70 to-yellow-950/50 border-blue-500/40'
                      : 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/15'
                  } ${isActive ? 'shadow-2xl' : ''}`}
                >
                  {/* Top gradient line */}
                  <div className={`h-1 bg-gradient-to-r ${isSweezy ? 'from-blue-500 to-yellow-500' : colors.gradient}`} />

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                            isSweezy
                              ? 'bg-gradient-to-br from-blue-500/30 to-yellow-500/30 border border-blue-400/40'
                              : `bg-gradient-to-br ${colors.gradient}`
                          }`}
                          style={!isSweezy ? { boxShadow: `0 8px 24px ${colors.glow}` } : {}}
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
                            <div className="flex items-center gap-1 mt-1">
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
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight line-clamp-2">
                      {getLocalizedText(caseData.title, lang)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-5 line-clamp-3 leading-relaxed">
                      {getLocalizedText(caseData.shortDescription, lang)}
                    </p>

                    {/* Results */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {topResults.map((result, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                        >
                          <TrendingUp className="w-4 h-4" style={{ color: isSweezy ? '#60a5fa' : colors.accent }} />
                          <span className="text-base font-bold text-white">
                            {result.prefix}{result.value}{result.suffix}
                          </span>
                          <span className="text-xs text-gray-500">{getLocalizedText(result.label, lang)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {caseData.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseData.technologies.length > 4 && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10">
                          +{caseData.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onDemoClick(caseData);
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 group-hover:scale-[1.02] ${
                        isSweezy
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : `bg-gradient-to-r ${colors.gradient} text-white`
                      }`}
                      style={!isSweezy ? { boxShadow: `0 4px 20px ${colors.glow}` } : {}}
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

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-white w-8'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
