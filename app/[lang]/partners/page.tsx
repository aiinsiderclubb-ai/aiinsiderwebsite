'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Handshake,
  TrendingUp,
  Repeat,
  CreditCard,
  FileText,
  UserCheck,
  LineChart as LineChartIcon,
  Unlock,
  Sparkles,
  Users,
  Target,
  Briefcase,
  Megaphone,
  Building2,
  Crown,
  ChevronDown,
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { useReveal } from '@/app/hooks/useReveal';

export default function PartnersPage() {
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;

  const { ref: headerRef, isVisible: headerVisible } = useReveal();
  const { ref: howRef, isVisible: howVisible } = useReveal();
  const { ref: tiersRef, isVisible: tiersVisible } = useReveal();
  const { ref: whoRef, isVisible: whoVisible } = useReveal();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useReveal();
  const { ref: faqRef, isVisible: faqVisible } = useReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useReveal();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    { icon: UserCheck, titleKey: 'partners.step1Title', descKey: 'partners.step1Desc' },
    { icon: Megaphone, titleKey: 'partners.step2Title', descKey: 'partners.step2Desc' },
    { icon: CreditCard, titleKey: 'partners.step3Title', descKey: 'partners.step3Desc' },
  ];

  const tiers = [
    {
      icon: Sparkles,
      nameKey: 'partners.tier1Name',
      rangeKey: 'partners.tier1Range',
      rateKey: 'partners.tier1Rate',
      descKey: 'partners.tier1Desc',
      featured: false,
      accent: '#9ca3af',
    },
    {
      icon: Crown,
      nameKey: 'partners.tier2Name',
      rangeKey: 'partners.tier2Range',
      rateKey: 'partners.tier2Rate',
      descKey: 'partners.tier2Desc',
      featured: true,
      accent: '#8b5cf6',
    },
    {
      icon: TrendingUp,
      nameKey: 'partners.tier3Name',
      rangeKey: 'partners.tier3Range',
      rateKey: 'partners.tier3Rate',
      descKey: 'partners.tier3Desc',
      featured: false,
      accent: '#f59e0b',
    },
  ];

  const audiences = [
    { icon: Briefcase, key: 'partners.who1' },
    { icon: Megaphone, key: 'partners.who2' },
    { icon: Building2, key: 'partners.who3' },
    { icon: Target, key: 'partners.who4' },
    { icon: Users, key: 'partners.who5' },
    { icon: FileText, key: 'partners.who6' },
  ];

  const benefits = [
    { icon: TrendingUp, titleKey: 'partners.benefit1Title', descKey: 'partners.benefit1Desc' },
    { icon: Repeat, titleKey: 'partners.benefit2Title', descKey: 'partners.benefit2Desc' },
    { icon: FileText, titleKey: 'partners.benefit3Title', descKey: 'partners.benefit3Desc' },
    { icon: UserCheck, titleKey: 'partners.benefit4Title', descKey: 'partners.benefit4Desc' },
    { icon: LineChartIcon, titleKey: 'partners.benefit5Title', descKey: 'partners.benefit5Desc' },
    { icon: Unlock, titleKey: 'partners.benefit6Title', descKey: 'partners.benefit6Desc' },
  ];

  const faqs = [
    { q: 'partners.faq1Q', a: 'partners.faq1A' },
    { q: 'partners.faq2Q', a: 'partners.faq2A' },
    { q: 'partners.faq3Q', a: 'partners.faq3A' },
    { q: 'partners.faq4Q', a: 'partners.faq4A' },
    { q: 'partners.faq5Q', a: 'partners.faq5A' },
  ];

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.10) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 10% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 90% 70%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div ref={headerRef} className="relative max-w-5xl mx-auto text-center">
          <div className={`reveal ${headerVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-violet-500/25 bg-violet-500/[0.08]">
              <Handshake className="w-4 h-4 text-violet-300" />
              <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
                {t('partners.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-[1.05]">
              <span className="text-white">{t('partners.title1')}</span>{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('partners.title2')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
              {t('partners.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`${basePath}/become-partner`} className="btn-primary px-8 py-4 text-base">
                <span>{t('partners.becomeCTA')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary px-8 py-4 text-base">
                <span>{t('partners.learnMore')}</span>
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            className={`mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto reveal reveal-delay-2 ${
              headerVisible ? 'visible' : ''
            }`}
          >
            {[
              { big: '25%', label: t('partners.statCommission') },
              { big: '∞', label: t('partners.statRecurring') },
              { big: '7d', label: t('partners.statPayout') },
            ].map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-1">
                  {s.big}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative py-20 px-6">
        <div ref={howRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-14 reveal ${howVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('partners.howTitle')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('partners.howSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${idx + 1} ${
                    howVisible ? 'visible' : ''
                  } relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 overflow-hidden group hover:border-white/20 transition-all duration-300`}
                >
                  <div className="absolute -top-6 -right-4 text-[120px] font-bold font-heading text-white/[0.03] leading-none select-none">
                    0{idx + 1}
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Step {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(step.titleKey)}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{t(step.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="relative py-20 px-6">
        <div ref={tiersRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-14 reveal ${tiersVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('partners.tiersTitle')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('partners.tiersSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${idx + 1} ${
                    tiersVisible ? 'visible' : ''
                  } relative rounded-3xl border overflow-hidden transition-all duration-300 ${
                    tier.featured
                      ? 'border-violet-500/40 bg-gradient-to-br from-violet-500/[0.08] to-white/[0.02] md:-translate-y-4'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[11px] font-bold uppercase tracking-wider text-center">
                      {t('pricing.popular')}
                    </div>
                  )}

                  <div className={`p-8 ${tier.featured ? 'pt-14' : ''}`}>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${tier.accent}22`, color: tier.accent }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {t(tier.rangeKey)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{t(tier.nameKey)}</h3>

                    <div className="flex items-baseline gap-2 mb-5">
                      <span
                        className="text-5xl md:text-6xl font-bold font-heading"
                        style={{ color: tier.accent }}
                      >
                        {t(tier.rateKey)}
                      </span>
                      <span className="text-sm text-gray-400">/deal</span>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">{t(tier.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`text-center mt-10 reveal ${tiersVisible ? 'visible' : ''}`}>
            <Link href={`${basePath}/become-partner`} className="btn-primary px-8 py-4 text-base">
              <span>{t('partners.becomeCTA')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="relative py-20 px-6">
        <div ref={whoRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-14 reveal ${whoVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('partners.whoTitle')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('partners.whoSubtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiences.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${Math.min(idx + 1, 4)} ${
                    whoVisible ? 'visible' : ''
                  } flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300`}
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base text-gray-200 font-medium">{t(a.key)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 px-6">
        <div ref={benefitsRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-14 reveal ${benefitsVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('partners.benefitsTitle')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${Math.min(idx + 1, 4)} ${
                    benefitsVisible ? 'visible' : ''
                  } relative rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-violet-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{t(b.titleKey)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t(b.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-6">
        <div ref={faqRef} className="relative max-w-3xl mx-auto">
          <div className={`text-center mb-12 reveal ${faqVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('partners.faqTitle')}
            </h2>
          </div>

          <div className={`space-y-3 reveal ${faqVisible ? 'visible' : ''}`}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base md:text-lg font-semibold text-white">{t(faq.q)}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm md:text-base text-gray-400 leading-relaxed">
                      {t(faq.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-6">
        <div ref={ctaRef} className="relative max-w-4xl mx-auto">
          <div
            className={`reveal ${ctaVisible ? 'visible' : ''} relative rounded-3xl border border-white/15 bg-gradient-to-br from-violet-500/[0.06] via-white/[0.02] to-pink-500/[0.04] p-10 md:p-14 text-center overflow-hidden`}
          >
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-40"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
                {t('partners.bottomCtaTitle')}
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                {t('partners.bottomCtaSubtitle')}
              </p>
              <Link href={`${basePath}/become-partner`} className="btn-primary px-8 py-4 text-base">
                <span>{t('partners.bottomCtaBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
