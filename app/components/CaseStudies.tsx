'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { casesData, categoryLabels, getLocalizedText, type CaseCategory, type CaseStudy } from '../lib/casesData';

const HOME_CASE_SLUGS = [
  'ecommerce-ai-chatbot',
  'beauty-salon-ai-admin',
  'real-estate-lead-qualification',
  'ai-voice-agent-calls',
] as const;

const categoryStyles: Record<CaseCategory, { gradient: string; glowColor: string }> = {
  ecommerce: { gradient: 'from-emerald-500 to-teal-500', glowColor: 'rgba(16, 185, 129, 0.35)' },
  beauty: { gradient: 'from-pink-500 to-rose-500', glowColor: 'rgba(236, 72, 153, 0.35)' },
  realestate: { gradient: 'from-blue-500 to-indigo-500', glowColor: 'rgba(59, 130, 246, 0.35)' },
  voice: { gradient: 'from-violet-500 to-purple-500', glowColor: 'rgba(139, 92, 246, 0.35)' },
  automation: { gradient: 'from-orange-500 to-amber-500', glowColor: 'rgba(249, 115, 22, 0.35)' },
  social: { gradient: 'from-cyan-500 to-blue-500', glowColor: 'rgba(6, 182, 212, 0.35)' },
};

const clientBySlug: Record<string, { uk: string; en: string }> = {
  'real-estate-lead-qualification': { uk: 'Агентство нерухомості', en: 'Real estate agency' },
};

export default function CaseStudies() {
  const { ref, isVisible } = useReveal();
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  const homeCases = HOME_CASE_SLUGS
    .map((slug) => casesData.find((c) => c.slug === slug))
    .filter(Boolean) as CaseStudy[];
  const sweezyProject = casesData.find((c) => c.slug === 'sweezy');

  return (
    <section id="cases" className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb),0.08) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/10 bg-white/[0.03]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {isEn ? 'Case Studies' : 'Кейси'}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 text-white leading-[1.1]">
            {isEn ? 'Real Results,' : 'Реальні результати,'}
            <span className="block mt-1 gradient-text">
              {isEn ? 'Real Impact' : 'Реальний вплив'}
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {isEn
              ? 'See how we\'ve transformed businesses with intelligent automation.'
              : 'Дізнайтесь, як ми трансформували бізнеси за допомогою інтелектуальної автоматизації.'}
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeCases.map((caseStudy, index) => {
            const style = categoryStyles[caseStudy.category] || categoryStyles.automation;
            const href = `${basePath}/cases/${caseStudy.slug}`;

            const primaryResult = caseStudy.results?.[0];
            const statValue = primaryResult
              ? `${primaryResult.prefix || ''}${primaryResult.value}${primaryResult.suffix || ''}`
              : '—';
            const statLabel = primaryResult ? getLocalizedText(primaryResult.label, lang) : '';

            const categoryLabel = categoryLabels[caseStudy.category]?.[lang] || categoryLabels.automation[lang];
            const title = getLocalizedText(caseStudy.title, lang);
            const desc = getLocalizedText(caseStudy.shortDescription, lang);
            const clientLabel =
              caseStudy.testimonial?.role?.[lang] ||
              clientBySlug[caseStudy.slug]?.[lang] ||
              getLocalizedText(caseStudy.industryName, lang);

            return (
              <div
                key={caseStudy.id}
                className={`reveal reveal-delay-${index + 1} ${isVisible ? 'visible' : ''} relative group`}
              >
                <Link href={href} className="block h-full">
                  <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.gradient}`} />

                    <div
                      className="absolute top-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to bottom, ${style.glowColor}, transparent)`,
                      }}
                    />

                    <div className="relative z-10 p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                        >
                          <span className="text-xl leading-none">{caseStudy.icon}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white leading-none">{statValue}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                            {statLabel}
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2 self-start">
                        <div className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                          {categoryLabel}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-400 mb-3">
                        <span className="text-gray-500">{isEn ? 'Client:' : 'Клієнт:'}</span>{' '}
                        <span className="text-gray-300">{clientLabel}</span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-white mb-1.5 leading-tight line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-3">
                        {desc}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                        <span>{isEn ? 'View Case' : 'Детальніше'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {sweezyProject ? (
          <div className={`mt-8 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '350ms' }}>
            <Link href={`${basePath}/cases/sweezy`} className="group block">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-cyan-500/[0.08] via-white/[0.03] to-blue-500/[0.06] p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                      <span className="text-sm">🇺🇦</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        {isEn ? 'Featured Project' : 'Флагманський проєкт'}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Sweezy
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {getLocalizedText(sweezyProject.shortDescription, lang)}
                    </p>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3">
                    <div className="text-left lg:text-right">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        {`${sweezyProject.results[0]?.prefix || ''}${sweezyProject.results[0]?.value}${sweezyProject.results[0]?.suffix || ''}`}
                      </div>
                      <div className="text-sm text-gray-400">
                        {sweezyProject.results[0] ? getLocalizedText(sweezyProject.results[0].label, lang) : ''}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                      {isEn ? 'View project' : 'Переглянути проєкт'}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : null}

        {lang === 'uk' ? (
          <div className={`mt-6 text-center reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '420ms' }}>
            <Link
              href="/uk/avtomatizaciya-salonu-krasy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
            >
              Автоматизація для салонів краси — повний гід
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : null}

        {/* Bottom CTA */}
        <div className={`mt-10 text-center reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
          <Link
            href={`${basePath}/cases`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 relative"
            style={{ boxShadow: 'var(--theme-shadow-glow)' }}
          >
            <span className="relative z-10">{isEn ? 'See All Case Studies' : 'Всі кейси'}</span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
