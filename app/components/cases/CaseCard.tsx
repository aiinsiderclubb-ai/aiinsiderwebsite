'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, AlertTriangle, CheckCircle2, Wrench, ExternalLink } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CaseCardProps {
  caseData: CaseStudy;
  index: number;
  onDemoClick: (caseData: CaseStudy) => void;
  onContactClick: () => void;
}

export default function CaseCard({ caseData, index, onDemoClick, onContactClick }: CaseCardProps) {
  const { lang, t } = useLanguage();
  
  // Special styling for Sweezy
  const isSweezy = caseData.id === 'case-sweezy';
  const accentBg = isSweezy ? 'bg-gradient-to-br from-blue-500/10 to-yellow-500/10' : 'bg-white/5';
  
  const handleCTAClick = (action: string) => {
    switch (action) {
      case 'demo':
        onDemoClick(caseData);
        break;
      case 'voice':
        onDemoClick(caseData);
        break;
      case 'flow':
        onDemoClick(caseData);
        break;
      case 'contact':
      case 'book':
        onContactClick();
        break;
      default:
        break;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-strong rounded-3xl overflow-hidden border border-white/10 
        hover:border-white/20 transition-all duration-300"
    >
      {/* Featured Badge */}
      {caseData.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-white">{t('cases.featured')}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-8">
        {/* Header - Clickable */}
        <Link href={`/cases/${caseData.slug}`} className="block mb-6 group/header">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl ${accentBg} border ${isSweezy ? 'border-blue-500/20' : 'border-white/10'} flex items-center justify-center text-2xl flex-shrink-0 group-hover/header:scale-105 transition-transform`}>
              {caseData.icon}
            </div>
            <div>
              <span className={`text-xs font-medium uppercase tracking-wider ${isSweezy ? 'text-blue-400' : 'text-gray-400'}`}>
                {getLocalizedText(caseData.industryName, lang)}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 leading-tight group-hover/header:text-gray-200 transition-colors">
                {getLocalizedText(caseData.title, lang)}
              </h3>
            </div>
          </div>
        </Link>

        {/* Short Description */}
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {getLocalizedText(caseData.shortDescription, lang)}
        </p>

        {/* Problem & Solution Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Problem */}
          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">{t('cases.problem')}</span>
            </div>
            <ul className="space-y-2">
              {caseData.problem.points.slice(0, 3).map((point, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-red-400/60 mt-0.5">×</span>
                  {getLocalizedText(point, lang)}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">{t('cases.solution')}</span>
            </div>
            <ul className="space-y-2">
              {caseData.solution.points.slice(0, 3).map((point, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-green-400/60 mt-0.5">✓</span>
                  {getLocalizedText(point, lang)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">{t('cases.results')}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {caseData.results.map((result, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-lg font-bold text-white">
                  {result.prefix}
                  {result.value}
                  {result.suffix}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight mt-1">
                  {getLocalizedText(result.label, lang)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Wrench className="w-4 h-4 text-gray-500" />
          {caseData.technologies.map((tech, i) => (
            <span 
              key={i} 
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          {caseData.ctas.slice(0, 2).map((cta) => (
            <button
              key={cta.id}
              onClick={() => handleCTAClick(cta.action)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold
                transition-all duration-200 hover:scale-[1.02]
                ${cta.primary 
                  ? isSweezy
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                    : 'bg-white text-black hover:shadow-lg hover:shadow-white/20' 
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <span>{cta.icon}</span>
              {getLocalizedText(cta.label, lang)}
              {cta.primary && <ArrowRight className="w-4 h-4" />}
            </button>
          ))}
          
          {/* Read More Link */}
          <Link
            href={`/cases/${caseData.slug}`}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold
              bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20
              transition-all duration-200 hover:scale-[1.02]"
          >
            <ExternalLink className="w-4 h-4" />
            {t('cases.readMore')}
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />
    </motion.article>
  );
}
