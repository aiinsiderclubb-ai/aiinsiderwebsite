'use client';

import Link from 'next/link';
import { ArrowRight, Handshake, TrendingUp, Repeat, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';

export default function PartnersTeaser() {
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const { ref, isVisible } = useReveal();

  const perks = [
    { icon: TrendingUp, label: '25%', sublabel: t('partners.statCommission') },
    { icon: Repeat, label: '∞', sublabel: t('partners.statRecurring') },
    { icon: UserCheck, label: '7d', sublabel: t('partners.statPayout') },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 50%, rgba(245, 158, 11, 0.06) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <div
          className={`reveal ${isVisible ? 'visible' : ''} relative rounded-[2rem] border border-white/15 overflow-hidden`}
          style={{
            background:
              'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(245, 158, 11, 0.05) 100%)',
          }}
        >
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.20) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative p-8 md:p-12 lg:p-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-violet-500/25 bg-violet-500/[0.10]">
                <Handshake className="w-4 h-4 text-violet-300" />
                <span className="text-xs font-semibold text-violet-200 uppercase tracking-wider">
                  {t('homePartners.badge')}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-[1.1]">
                <span className="text-white">{t('homePartners.title1')}</span>{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('homePartners.title2')}
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
                {t('homePartners.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link href={`${basePath}/become-partner`} className="btn-primary px-7 py-3.5 text-sm md:text-base">
                  <span>{t('homePartners.cta')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href={`${basePath}/partners`} className="btn-secondary px-7 py-3.5 text-sm md:text-base">
                  <span>{t('homePartners.secondaryCta')}</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                {perks.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-black/20 p-3 text-center"
                    >
                      <Icon className="w-4 h-4 text-violet-300 mx-auto mb-1" />
                      <div className="text-xl md:text-2xl font-bold text-white">{perk.label}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight mt-0.5">
                        {perk.sublabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div
                className="relative w-56 h-56 rounded-full border border-white/15 flex items-center justify-center"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.20), rgba(245, 158, 11, 0.20), rgba(139, 92, 246, 0.25))',
                }}
              >
                <div className="absolute inset-3 rounded-full bg-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="text-6xl font-bold font-heading"
                      style={{
                        background: 'linear-gradient(135deg, #a78bfa 0%, #fbbf24 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      25%
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                      {t('partners.statCommission')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
