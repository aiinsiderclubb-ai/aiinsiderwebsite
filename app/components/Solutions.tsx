'use client';

import { Mic, Workflow, LineChart, Sparkles, ArrowRight, Clock, Users, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import Link from 'next/link';

export default function Solutions() {
  const { ref, isVisible } = useReveal();
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';

  const seoPages = [
    { href: `${basePath}/ai-automation-for-business`, label: isEn ? 'AI automation' : 'AI автоматизація' },
    { href: `${basePath}/ai-chatbots-for-business`, label: isEn ? 'AI chatbots' : 'AI чатботи' },
    { href: `${basePath}/ai-voice-agents`, label: isEn ? 'AI voice agents' : 'Голосові агенти' },
    { href: `${basePath}/custom-ai-agents`, label: isEn ? 'Custom AI agents' : 'Кастомні агенти' },
  ];

  const solutions = [
    {
      titleKey: 'solutions.solution1Title',
      descKey: 'solutions.solution1Desc',
      icon: Mic,
      href: `${basePath}/services/ai-voice-agent`,
      gradient: 'from-emerald-500 to-teal-500',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      accentColor: '#10b981',
      timeframe: isEn ? '2-4 weeks' : '2-4 тижні',
      clients: '+50',
      tags: isEn
        ? ['24/7 calls & chat', 'Meeting booking', 'CRM handoff']
        : ['24/7 дзвінки та чат', 'Бронювання зустрічей', 'Передача в CRM'],
    },
    {
      titleKey: 'solutions.solution2Title',
      descKey: 'solutions.solution2Desc',
      icon: Workflow,
      href: `${basePath}/services/workflow-automation`,
      gradient: 'from-violet-500 to-purple-500',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      accentColor: '#8b5cf6',
      timeframe: isEn ? '2-5 weeks' : '2-5 тижнів',
      clients: '+50',
      tags: isEn
        ? ['Lead routing', 'CRM sync', 'No manual ops']
        : ['Маршрутизація лідів', 'Синхронізація з CRM', 'Без ручної рутини'],
    },
    {
      titleKey: 'solutions.solution3Title',
      descKey: 'solutions.solution3Desc',
      icon: LineChart,
      href: `${basePath}/services/analytics-assistants`,
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      accentColor: '#3b82f6',
      timeframe: isEn ? '3-6 weeks' : '3-6 тижнів',
      clients: '+50',
      tags: isEn
        ? ['Weekly reports', 'Alerts', 'Actionable insights']
        : ['Щотижневі звіти', 'Алерти', 'Інсайти для дій'],
    },
    {
      titleKey: 'solutions.solution4Title',
      descKey: 'solutions.solution4Desc',
      icon: Sparkles,
      href: `${basePath}/services/custom-ai-models`,
      gradient: 'from-orange-500 to-amber-500',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      accentColor: '#f97316',
      timeframe: isEn ? '3-8 weeks' : '3-8 тижнів',
      clients: '+50',
      tags: isEn
        ? ['RAG knowledge base', 'Custom GPT', 'Stack integration']
        : ['RAG база знань', 'Кастомний GPT', 'Інтеграція в стек'],
    },
  ];

  return (
    <section id="solutions" className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 30%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-emerald-500/25 bg-emerald-500/[0.08]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              {t('solutions.badge')}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 leading-[1.1]">
            <span className="text-white">{t('solutions.title1')}</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('solutions.title2')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className={`reveal reveal-delay-${index + 1} ${isVisible ? 'visible' : ''} group relative`}
              >
                <Link href={solution.href} className="block h-full">
                  <div className="relative h-full rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${solution.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top right, ${solution.accentColor} 0%, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 p-6 lg:p-7">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                          style={{ boxShadow: `0 8px 24px ${solution.glowColor}` }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs font-medium text-gray-300">
                            {solution.timeframe}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight">
                        {t(solution.titleKey)}
                      </h3>

                      <p className="text-sm lg:text-base text-gray-400 leading-relaxed mb-5 line-clamp-2">
                        {t(solution.descKey)}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {solution.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 transition-colors group-hover:border-white/15 group-hover:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className="w-7 h-7 rounded-full border-2 border-black/50 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center"
                              >
                                <Users className="w-3 h-3 text-white/60" />
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {solution.clients} {isEn ? 'clients' : 'клієнтів'}
                          </span>
                        </div>

                        <div
                          className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                          style={{ color: solution.accentColor }}
                        >
                          <span>{isEn ? 'Learn more' : 'Детальніше'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* SEO quick links */}
        <div className={`mt-10 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {seoPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-xs md:text-sm px-4 py-2 rounded-full bg-white/[0.03] text-gray-400 border border-white/10
                  transition-all duration-300 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
              >
                {p.label}
              </Link>
            ))}
            <Link
              href={`${basePath}/blog`}
              className="text-xs md:text-sm px-4 py-2 rounded-full bg-white/[0.03] text-gray-400 border border-white/10
                transition-all duration-300 hover:border-white/20 hover:text-white hover:bg-white/[0.06]"
            >
              {isEn ? 'AI insights & guides' : 'AI інсайти та гайди'}
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-14 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg
              overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <span className="relative z-10">{t('solutions.cta')}</span>
            <Zap className="relative z-10 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
