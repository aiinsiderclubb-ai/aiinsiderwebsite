'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Zap, Layers } from 'lucide-react';
import { RealEstateCase, getLocalizedREText } from '@/app/lib/realEstateCases';
import { Language } from '@/app/lib/translations';
import { SCHEDULING_URL } from '@/app/lib/config';

interface RECaseModalProps {
  caseData: RealEstateCase | null;
  lang: Language;
  onClose: () => void;
}

export default function RECaseModal({ caseData, lang, onClose }: RECaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseData) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [caseData, onClose]);

  if (!caseData) return null;

  const title = getLocalizedREText(caseData.title, lang);
  const problem = getLocalizedREText(caseData.problem, lang);
  const result = getLocalizedREText(caseData.result, lang);
  const automated = caseData.automated[lang] || caseData.automated.en;
  const modules = caseData.modules?.[lang] || caseData.modules?.en || [];

  return (
    <AnimatePresence>
      {caseData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
              bg-white rounded-3xl shadow-2xl shadow-slate-900/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full
                bg-slate-100 hover:bg-slate-200 flex items-center justify-center
                text-slate-500 hover:text-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-8 pb-0">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100
                    flex items-center justify-center text-3xl"
                >
                  {caseData.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                </div>
              </div>

              {/* Metrics */}
              {caseData.metrics && caseData.metrics.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {caseData.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100"
                    >
                      <span className="text-xl font-bold text-blue-700">{metric.value}</span>
                      <span className="text-sm text-blue-600 ml-2">
                        {getLocalizedREText(metric.label, lang)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Problem */}
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                    {lang === 'uk' ? 'Проблема' : 'Problem'}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{problem}</p>
              </div>

              {/* Automated */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                    {lang === 'uk' ? 'Що автоматизовано' : 'What\'s Automated'}
                  </span>
                </div>
                <ul className="space-y-2">
                  {automated.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules */}
              {modules.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      {lang === 'uk' ? 'Модулі системи' : 'System Modules'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {modules.map((mod, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200
                          text-sm text-slate-700 font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                    {lang === 'uk' ? 'Результат для бізнесу' : 'Business Outcome'}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{result}</p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href={SCHEDULING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4
                    bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold
                    transition-colors shadow-lg shadow-blue-600/20"
                >
                  {lang === 'uk' ? 'Обговорити для вашого бізнесу' : 'Discuss for Your Business'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
