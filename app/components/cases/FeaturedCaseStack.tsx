'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle2, Wrench, Rocket, TrendingUp, RefreshCw } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';
import OutreachUIDemo from './OutreachUIDemo';

interface FeaturedCaseStackProps {
  caseData: CaseStudy;
  onDemoClick: (caseData: CaseStudy) => void;
  onContactClick: () => void;
}

export default function FeaturedCaseStack({ caseData, onDemoClick, onContactClick }: FeaturedCaseStackProps) {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;
  const [activeCard, setActiveCard] = useState<'problem' | 'solution'>('problem');

  return (
    <div className="relative">
      <div className="relative rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 50%, transparent)' }} />

        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-xl shrink-0">
                  {caseData.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Rocket className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] truncate">
                      {t('cases.featuredCase')}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight truncate">
                    {getLocalizedText(caseData.title, lang)}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {getLocalizedText(caseData.shortDescription, lang)}
              </p>
            </div>

            {/* Results */}
            <div className="flex gap-2 shrink-0 flex-wrap lg:flex-nowrap">
              {caseData.results.map((result, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <TrendingUp className="w-3.5 h-3.5 text-white/30 shrink-0" />
                  <span className="text-lg font-bold text-white whitespace-nowrap">
                    {result.prefix}{result.value}{result.suffix}
                  </span>
                  <span className="text-[10px] text-gray-600 whitespace-nowrap">{getLocalizedText(result.label, lang)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Before / After toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveCard('problem')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCard === 'problem'
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-gray-600 hover:text-gray-400 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {isEn ? 'Before' : 'До'}
                </span>
              </button>

              <button
                onClick={() => setActiveCard(activeCard === 'problem' ? 'solution' : 'problem')}
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-600 hover:text-white hover:border-white/20 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveCard('solution')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCard === 'solution'
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-gray-600 hover:text-gray-400 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isEn ? 'After' : 'Після'}
                </span>
              </button>
            </div>

            {/* Stacked cards */}
            <div className="relative h-[220px] md:h-[200px]">
              <div
                className={`absolute inset-x-2 top-2 bottom-0 rounded-xl border transition-all duration-500 ${
                  activeCard === 'problem'
                    ? 'bg-white/[0.01] border-white/[0.04]'
                    : 'bg-white/[0.01] border-white/[0.04]'
                }`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ rotateY: -90, opacity: 0, scale: 0.95 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: 90, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                  style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                >
                  <div className="h-full p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                        {activeCard === 'problem' ? (
                          <AlertTriangle className="w-4 h-4 text-white/40" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider text-white/50">
                        {getLocalizedText(
                          activeCard === 'problem' ? caseData.problem.title : caseData.solution.title,
                          lang,
                        )}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                      {(activeCard === 'problem' ? caseData.problem.points : caseData.solution.points).map(
                        (point, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.05 }}
                            className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/[0.03]"
                          >
                            <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] mt-0.5 bg-white/[0.06] text-white/40">
                              {activeCard === 'problem' ? '×' : '✓'}
                            </span>
                            <span className="text-xs text-gray-400 leading-relaxed">{getLocalizedText(point, lang)}</span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Technologies + CTAs */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              <Wrench className="w-3.5 h-3.5 text-gray-700 shrink-0" />
              {caseData.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] text-gray-600 border border-white/[0.06] hover:border-white/15 hover:text-gray-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 shrink-0">
              {caseData.ctas.map((cta) => (
                <button
                  key={cta.id}
                  onClick={() => {
                    if (cta.action === 'demo' || cta.action === 'flow') {
                      onDemoClick(caseData);
                    } else {
                      onContactClick();
                    }
                  }}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 ${
                    cta.primary
                      ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <span>{cta.icon}</span>
                  {getLocalizedText(cta.label, lang)}
                  {cta.primary && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo UI */}
        <div className="px-6 md:px-8 pb-8">
          <OutreachUIDemo />
        </div>
      </div>
    </div>
  );
}
