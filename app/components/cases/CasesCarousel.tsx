'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStudy, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CasesCarouselProps {
  cases: CaseStudy[];
  onDemoClick: (caseData: CaseStudy) => void;
}

export default function CasesCarousel({ cases, onDemoClick }: CasesCarouselProps) {
  const { lang, t } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';

  const pageSize = 6;
  const totalPages = Math.ceil(cases.length / pageSize);
  const [page, setPage] = useState(0);

  const navigate = useCallback(
    (dir: 'left' | 'right') => {
      setPage((p) => (dir === 'right' ? Math.min(p + 1, totalPages - 1) : Math.max(p - 1, 0)));
    },
    [totalPages],
  );

  const visible = cases.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="absolute -top-16 right-0 flex items-center gap-3 z-10">
        <span className="text-sm text-gray-500 mr-2">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => navigate('left')}
          disabled={page === 0}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            page > 0
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('right')}
          disabled={page >= totalPages - 1}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            page < totalPages - 1
              ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white'
              : 'border-white/10 bg-white/[0.02] text-white/30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((caseData, idx) => {
          const globalIdx = page * pageSize + idx;
          const displayNum = String(globalIdx + 1).padStart(2, '0');
          const topResults = caseData.results.slice(0, 2);

          return (
            <Link
              key={caseData.id}
              href={`${basePath}/cases/${caseData.slug}`}
              className="group relative flex flex-col rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(255,255,255,0.04)]"
            >
              {/* Watermark number */}
              <div className="absolute top-4 right-5 text-[72px] font-bold leading-none text-white/[0.04] select-none pointer-events-none transition-colors duration-300 group-hover:text-white/[0.07]">
                {displayNum}
              </div>

              <div className="relative flex flex-col flex-1 p-6">
                {/* Header: icon + industry */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {caseData.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                    {getLocalizedText(caseData.industryName, lang)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
                  {getLocalizedText(caseData.title, lang)}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5 flex-1">
                  {getLocalizedText(caseData.shortDescription, lang)}
                </p>

                {/* Results */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {topResults.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-sm font-bold text-white">
                        {result.prefix}{result.value}{result.suffix}
                      </span>
                      <span className="text-[10px] text-gray-600 hidden sm:inline">
                        {getLocalizedText(result.label, lang)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {caseData.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] text-gray-600 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {caseData.technologies.length > 3 && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] text-gray-600 border border-white/[0.06]">
                      +{caseData.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                    {isEn ? 'View case' : 'Переглянути'}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-sm text-white/40 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Page dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? 'bg-white w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
