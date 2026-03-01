'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Zap, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CaseCardProps {
  caseData: CaseStudy;
  index: number;
  onDemoClick: (caseData: CaseStudy) => void;
  onContactClick: () => void;
}

const categoryGradients: Record<string, { gradient: string; glow: string; accent: string }> = {
  ecommerce: { gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.3)', accent: '#10b981' },
  beauty: { gradient: 'from-pink-500 to-rose-500', glow: 'rgba(236, 72, 153, 0.3)', accent: '#ec4899' },
  realestate: { gradient: 'from-blue-500 to-indigo-500', glow: 'rgba(59, 130, 246, 0.3)', accent: '#3b82f6' },
  voice: { gradient: 'from-violet-500 to-purple-500', glow: 'rgba(139, 92, 246, 0.3)', accent: '#8b5cf6' },
  automation: { gradient: 'from-orange-500 to-amber-500', glow: 'rgba(249, 115, 22, 0.3)', accent: '#f97316' },
  social: { gradient: 'from-cyan-500 to-blue-500', glow: 'rgba(6, 182, 212, 0.3)', accent: '#06b6d4' },
};

export default function CaseCard({ caseData, index, onDemoClick }: CaseCardProps) {
  const { lang, t } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  
  const isSweezy = caseData.id === 'case-sweezy';
  const colors = categoryGradients[caseData.category] || categoryGradients.automation;
  const topResults = caseData.results.slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative h-full"
    >
      <Link href={`${basePath}/cases/${caseData.slug}`} className="block h-full">
        {/* Outer glow on hover */}
        <div
          className="absolute -inset-0.5 rounded-[1.75rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
          style={{ background: `linear-gradient(135deg, ${colors.glow} 0%, transparent 100%)` }}
        />

        {/* Main Card */}
        <div
          className={`
            relative h-full overflow-hidden rounded-[1.5rem] border transition-all duration-500
            ${isSweezy
              ? 'bg-gradient-to-br from-blue-950/60 to-yellow-950/40 border-blue-500/30 hover:border-blue-400/50'
              : 'bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-white/10 hover:border-white/25'
            }
            hover:-translate-y-2 hover:shadow-2xl
          `}
        >
          {/* Top accent line */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${isSweezy ? 'from-blue-500 to-yellow-500' : colors.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Corner decoration */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at top right, ${isSweezy ? '#3b82f6' : colors.accent} 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col h-full">
            {/* Top Row: Icon + Industry + Featured Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon with gradient bg */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-xl
                    ${isSweezy
                      ? 'bg-gradient-to-br from-blue-500/30 to-yellow-500/30 border border-blue-400/40'
                      : `bg-gradient-to-br ${colors.gradient} shadow-lg`
                    }
                  `}
                  style={!isSweezy ? { boxShadow: `0 8px 24px ${colors.glow}` } : {}}
                >
                  {caseData.icon}
                </motion.div>
                {/* Industry Label */}
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: isSweezy ? '#60a5fa' : colors.accent }}
                >
                  {getLocalizedText(caseData.industryName, lang)}
                </span>
              </div>

              {/* Featured Badge */}
              {caseData.featured && (
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                    isSweezy ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <Zap className={`w-3 h-3 ${isSweezy ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider">
                    {t('cases.featured')}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2.5 leading-snug line-clamp-2 group-hover:text-gray-100 transition-colors">
              {getLocalizedText(caseData.title, lang)}
            </h3>

            {/* Short description */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow">
              {getLocalizedText(caseData.shortDescription, lang)}
            </p>

            {/* Results Row - Stylized */}
            <div className="flex flex-wrap gap-2 mb-4">
              {topResults.map((result, i) => (
                <div
                  key={i}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg
                    ${isSweezy ? 'bg-blue-500/15 border border-blue-500/20' : 'bg-white/5 border border-white/10'}
                  `}
                >
                  <TrendingUp
                    className="w-3.5 h-3.5"
                    style={{ color: isSweezy ? '#60a5fa' : colors.accent }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{ color: isSweezy ? '#93c5fd' : '#fff' }}
                  >
                    {result.prefix}
                    {result.value}
                    {result.suffix}
                  </span>
                  <span className="text-[10px] text-gray-500">{getLocalizedText(result.label, lang)}</span>
                </div>
              ))}
            </div>

            {/* Tech Tags - Compact pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {caseData.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5 group-hover:border-white/10 group-hover:text-gray-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {caseData.technologies.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5">
                  +{caseData.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Bottom: CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDemoClick(caseData);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
                  transition-all duration-300 hover:scale-105
                  ${isSweezy
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                    : `bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg`
                  }
                `}
                style={!isSweezy ? { boxShadow: `0 4px 20px ${colors.glow}` } : {}}
              >
                {caseData.ctas[0]?.icon}
                <span>{getLocalizedText(caseData.ctas[0]?.label, lang)}</span>
              </button>

              {/* Arrow indicator */}
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  ${isSweezy ? 'bg-blue-500/15' : 'bg-white/5'}
                  group-hover:bg-white/10 transition-all duration-300
                  group-hover:translate-x-1 group-hover:-translate-y-1
                `}
              >
                <ArrowUpRight className={`w-4 h-4 ${isSweezy ? 'text-blue-400' : 'text-white'}`} />
              </div>
            </div>
          </div>

          {/* Animated gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${isSweezy ? 'rgba(59,130,246,0.05)' : colors.glow.replace('0.3', '0.05')} 0%, transparent 50%)`,
            }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
