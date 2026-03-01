'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle2, Wrench, Rocket, ChevronLeft, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
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
  const [activeCard, setActiveCard] = useState<'problem' | 'solution'>('problem');
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCard = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActiveCard(activeCard === 'problem' ? 'solution' : 'problem');
      setIsFlipping(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      {/* Background glow */}
      <div
        className="absolute -inset-10 rounded-[3rem] opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Main container */}
      <div className="relative rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-orange-950/30 via-black/50 to-red-950/20 overflow-hidden">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        {/* Header section */}
        <div className="p-8 md:p-10 pb-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
            <Rocket className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">
              {t('cases.featuredCase')} • {getLocalizedText(caseData.industryName, lang)}
            </span>
          </div>

          {/* Title row */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/30">
                  {caseData.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {getLocalizedText(caseData.title, lang)}
                </h3>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                {getLocalizedText(caseData.shortDescription, lang)}
              </p>
            </div>

            {/* Results grid */}
            <div className="grid grid-cols-2 gap-3 lg:w-72 shrink-0">
              {caseData.results.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-2xl font-bold text-white">
                        {result.prefix}{result.value}{result.suffix}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{getLocalizedText(result.label, lang)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Stack Section */}
        <div className="px-8 md:px-10 pb-8">
          {/* Card stack header with toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveCard('problem')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCard === 'problem'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {isEn ? 'Before' : 'До'}
                </span>
              </button>
              <button
                onClick={() => setActiveCard('solution')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCard === 'solution'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {isEn ? 'After' : 'Після'}
                </span>
              </button>
            </div>

            {/* Flip button */}
            <button
              onClick={flipCard}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <span>{isEn ? 'Flip card' : 'Перегорнути'}</span>
              <motion.div
                animate={{ rotateY: activeCard === 'solution' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>
          </div>

          {/* Stacked cards container */}
          <div className="relative h-[320px] md:h-[280px]">
            {/* Background card (peek effect) */}
            <div
              className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${
                activeCard === 'problem'
                  ? 'bg-green-500/5 border-green-500/10 translate-x-3 translate-y-3'
                  : 'bg-red-500/5 border-red-500/10 -translate-x-3 translate-y-3'
              }`}
            />

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                {activeCard === 'problem' ? (
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-950/20 border border-red-500/20 shadow-xl shadow-red-500/10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <span className="text-lg font-bold text-red-400 uppercase tracking-wider">
                        {getLocalizedText(caseData.problem.title, lang)}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {caseData.problem.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs mt-0.5">×</span>
                          <span className="text-sm leading-relaxed">{getLocalizedText(point, lang)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-950/20 border border-green-500/20 shadow-xl shadow-green-500/10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-lg font-bold text-green-400 uppercase tracking-wider">
                        {getLocalizedText(caseData.solution.title, lang)}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {caseData.solution.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs mt-0.5">✓</span>
                          <span className="text-sm leading-relaxed">{getLocalizedText(point, lang)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Technologies & CTAs */}
        <div className="px-8 md:px-10 pb-8 md:pb-10">
          {/* Technologies */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Wrench className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 mr-2">{t('cases.technologies')}</span>
            {caseData.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 hover:border-orange-500/30 hover:text-orange-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
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
                className={`group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  cta.primary
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span>{cta.icon}</span>
                {getLocalizedText(cta.label, lang)}
                {cta.primary && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            ))}
          </div>
        </div>

        {/* Demo UI Section */}
        <div className="px-8 md:px-10 pb-10">
          <OutreachUIDemo />
        </div>
      </div>
    </motion.div>
  );
}
