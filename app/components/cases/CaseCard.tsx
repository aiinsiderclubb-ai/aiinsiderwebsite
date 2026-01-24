'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Zap, TrendingUp } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CaseCardProps {
  caseData: CaseStudy;
  index: number;
  onDemoClick: (caseData: CaseStudy) => void;
  onContactClick: () => void;
}

export default function CaseCard({ caseData, index, onDemoClick }: CaseCardProps) {
  const { lang, t } = useLanguage();
  const basePath = `/${lang}`;
  
  // Special styling for Sweezy
  const isSweezy = caseData.id === 'case-sweezy';
  
  // Get top 2 results for compact display
  const topResults = caseData.results.slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`${basePath}/cases/${caseData.slug}`} className="block">
        {/* Main Card */}
        <div 
          className={`
            relative overflow-hidden rounded-2xl border transition-all duration-300
            ${isSweezy 
              ? 'bg-gradient-to-br from-blue-950/50 to-yellow-950/30 border-blue-500/20 hover:border-blue-400/40' 
              : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
            }
          `}
        >
          {/* Animated gradient border on hover */}
          <div 
            className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${isSweezy 
                ? 'bg-gradient-to-br from-blue-500/10 to-yellow-500/10' 
                : 'bg-gradient-to-br from-white/5 to-transparent'
              }
            `}
          />
          
          {/* Content */}
          <div className="relative p-5">
            {/* Top Row: Icon + Industry + Featured Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon with glow */}
                <div 
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center text-xl
                    ${isSweezy 
                      ? 'bg-gradient-to-br from-blue-500/20 to-yellow-500/20 border border-blue-400/30' 
                      : 'bg-white/5 border border-white/10 group-hover:border-white/20'
                    }
                    transition-all duration-300 group-hover:scale-105
                  `}
                  style={!isSweezy ? { boxShadow: '0 0 20px rgba(255,255,255,0.05)' } : {}}
                >
                  {caseData.icon}
                </div>
                {/* Industry Label */}
                <span className={`text-xs font-medium uppercase tracking-wider ${isSweezy ? 'text-blue-400' : 'text-gray-500'}`}>
                  {getLocalizedText(caseData.industryName, lang)}
                </span>
              </div>
              
              {/* Featured Badge */}
              {caseData.featured && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isSweezy ? 'bg-yellow-500/20' : 'bg-white/5'}`}>
                  <Zap className={`w-3 h-3 ${isSweezy ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <span className="text-[10px] font-semibold text-yellow-400/90">{t('cases.featured')}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-gray-100 transition-colors line-clamp-2">
              {getLocalizedText(caseData.title, lang)}
            </h3>

            {/* Short description */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              {getLocalizedText(caseData.shortDescription, lang)}
            </p>

            {/* Results Row - Compact */}
            <div className="flex items-center gap-3 mb-4">
              {topResults.map((result, i) => (
                <div 
                  key={i} 
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg
                    ${isSweezy ? 'bg-blue-500/10' : 'bg-white/5'}
                  `}
                >
                  <TrendingUp className={`w-3.5 h-3.5 ${isSweezy ? 'text-blue-400' : 'text-green-400'}`} />
                  <span className={`text-sm font-bold ${isSweezy ? 'text-blue-300' : 'text-white'}`}>
                    {result.prefix}{result.value}{result.suffix}
                  </span>
                  <span className="text-xs text-gray-500">{getLocalizedText(result.label, lang)}</span>
                </div>
              ))}
            </div>

            {/* Tech Tags - Minimal */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {caseData.technologies.slice(0, 3).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5"
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
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDemoClick(caseData);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                  transition-all duration-200 hover:scale-[1.02]
                  ${isSweezy 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25' 
                    : 'bg-white text-black hover:shadow-lg hover:shadow-white/20'
                  }
                `}
              >
                {caseData.ctas[0]?.icon}
                <span>{getLocalizedText(caseData.ctas[0]?.label, lang)}</span>
              </button>
              
              {/* Arrow indicator */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isSweezy ? 'bg-blue-500/10' : 'bg-white/5'}
                group-hover:bg-white/10 transition-all duration-300
                group-hover:translate-x-1 group-hover:-translate-y-1
              `}>
                <ArrowUpRight className={`w-4 h-4 ${isSweezy ? 'text-blue-400' : 'text-white'}`} />
              </div>
            </div>
          </div>

          {/* Decorative corner gradient */}
          <div 
            className={`
              absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${isSweezy ? 'bg-blue-500/10' : 'bg-white/5'}
            `}
          />
        </div>
      </Link>
    </motion.article>
  );
}
