'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { realEstateCases, RealEstateCase } from '@/app/lib/realEstateCases';
import { SCHEDULING_URL } from '@/app/lib/config';
import RECaseCard from '@/app/components/solutions/RECaseCard';
import RECaseModal from '@/app/components/solutions/RECaseModal';
import Link from 'next/link';

export default function RealEstateSolutionsPage() {
  const { lang, t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<RealEstateCase | null>(null);

  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const texts = {
    uk: {
      badge: 'Рішення для нерухомості',
      headline: 'AI-рішення для операцій у сфері нерухомості',
      subheadline: 'Від продуктивності ріелторів до аналітики рівня власника',
      viewSolutions: 'Дивитись рішення',
      casesTitle: 'Готові рішення',
      casesSubtitle: 'Кожне рішення — це реальний кейс з вимірюваним результатом для бізнесу',
      ctaTitle: 'Хочете побачити, як це працюватиме у вашому бізнесі?',
      ctaSubtitle: 'Обговоримо ваші процеси і покажемо, що можна автоматизувати',
      requestDemo: 'Запросити демо',
      writeUs: 'Написати нам',
      backToHome: '← На головну',
    },
    en: {
      badge: 'Real Estate Solutions',
      headline: 'AI Solutions for Real Estate Operations',
      subheadline: 'From realtor productivity to owner-level analytics',
      viewSolutions: 'View Solutions',
      casesTitle: 'Ready Solutions',
      casesSubtitle: 'Each solution is a real case with measurable business results',
      ctaTitle: 'Want to see this applied to your business?',
      ctaSubtitle: 'Let\'s discuss your processes and show what can be automated',
      requestDemo: 'Request Demo',
      writeUs: 'Write to Us',
      backToHome: '← Back to Home',
    },
  };

  const txt = texts[lang] || texts.en;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">AI Insider</span>
          </Link>
          <a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
              rounded-lg transition-colors"
          >
            {txt.requestDemo}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{txt.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              {txt.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{txt.subheadline}</p>

            {/* CTA */}
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800
                text-white rounded-xl font-medium transition-colors"
            >
              {txt.viewSolutions}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section id="solutions" ref={gridRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{txt.casesTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{txt.casesSubtitle}</p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEstateCases.map((caseData, index) => (
              <RECaseCard
                key={caseData.id}
                caseData={caseData}
                lang={lang}
                index={index}
                onSelect={setSelectedCase}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{txt.ctaTitle}</h2>
            <p className="text-lg text-slate-600 mb-10">{txt.ctaSubtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700
                  text-white rounded-xl font-semibold transition-colors
                  shadow-lg shadow-blue-600/20"
              >
                <Phone className="w-5 h-5" />
                {txt.requestDemo}
              </a>
              <a
                href="https://t.me/aiinsider"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200
                  text-slate-700 rounded-xl font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {txt.writeUs}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/${lang}`}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            {txt.backToHome}
          </Link>
          <p className="text-sm text-slate-400">© 2025 AI Insider</p>
        </div>
      </footer>

      {/* Modal */}
      <RECaseModal caseData={selectedCase} lang={lang} onClose={() => setSelectedCase(null)} />
    </main>
  );
}
