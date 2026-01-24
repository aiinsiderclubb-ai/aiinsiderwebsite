'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RealEstateCase, getLocalizedREText } from '@/app/lib/realEstateCases';
import { Language } from '@/app/lib/translations';

interface RECaseCardProps {
  caseData: RealEstateCase;
  lang: Language;
  index: number;
  onSelect: (caseData: RealEstateCase) => void;
}

export default function RECaseCard({ caseData, lang, index, onSelect }: RECaseCardProps) {
  const title = getLocalizedREText(caseData.title, lang);
  const shortDesc = getLocalizedREText(caseData.shortDescription, lang);
  const problem = getLocalizedREText(caseData.problem, lang);
  const result = getLocalizedREText(caseData.result, lang);
  const automated = caseData.automated[lang] || caseData.automated.en;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onSelect(caseData)}
      className="group cursor-pointer"
    >
      <div
        className="relative h-full p-6 bg-white rounded-2xl border border-slate-200/80
          shadow-sm hover:shadow-lg hover:shadow-slate-200/50
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-blue-200"
      >
        {/* Icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100
              flex items-center justify-center text-2xl
              group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors"
          >
            {caseData.icon}
          </div>
          <ArrowRight
            className="w-5 h-5 text-slate-300 group-hover:text-blue-500 
              group-hover:translate-x-1 transition-all"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-900 transition-colors">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{shortDesc}</p>

        {/* Problem snippet */}
        <div className="mb-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {lang === 'uk' ? 'Проблема' : 'Problem'}
          </span>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{problem}</p>
        </div>

        {/* Automated preview */}
        <div className="mb-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {lang === 'uk' ? 'Автоматизовано' : 'Automated'}
          </span>
          <ul className="mt-1 space-y-1">
            {automated.slice(0, 2).map((item, i) => (
              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
            {automated.length > 2 && (
              <li className="text-xs text-slate-400">
                +{automated.length - 2} {lang === 'uk' ? 'ще' : 'more'}
              </li>
            )}
          </ul>
        </div>

        {/* Result preview */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {lang === 'uk' ? 'Результат' : 'Result'}
          </span>
          <p className="text-sm text-slate-700 mt-1 line-clamp-2 font-medium">{result}</p>
        </div>

        {/* Metrics badges */}
        {caseData.metrics && caseData.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {caseData.metrics.map((metric, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                  bg-blue-50 text-blue-700 text-xs font-semibold"
              >
                <span>{metric.value}</span>
                <span className="text-blue-500 font-normal">
                  {getLocalizedREText(metric.label, lang)}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
