'use client';

import { useState, FormEvent, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Wrench,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Zap,
  Globe,
  Rocket,
  X,
  AlertCircle,
  Loader2,
  MessageCircle,
  Briefcase,
  FileCheck,
  Phone,
  Award,
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { useReveal } from '@/app/hooks/useReveal';

type Vacancy = {
  id: string;
  titleKey: string;
  tagKey: string;
  shortKey: string;
  salaryKey: string;
  typeKey: string;
  aboutTitleKey: string;
  aboutKey: string;
  respTitleKey: string;
  respKeys: string[];
  reqTitleKey: string;
  reqKeys: string[];
  niceTitleKey: string;
  niceKeys: string[];
  offerTitleKey: string;
  offerKeys: string[];
  icon: typeof Sparkles;
  accent: string;
  gradient: string;
  glow: string;
};

const VACANCIES: Vacancy[] = [
  {
    id: 'ai-creator',
    titleKey: 'careers.v1Title',
    tagKey: 'careers.v1Tag',
    shortKey: 'careers.v1Short',
    salaryKey: 'careers.v1Salary',
    typeKey: 'careers.v1Type',
    aboutTitleKey: 'careers.v1AboutTitle',
    aboutKey: 'careers.v1About',
    respTitleKey: 'careers.v1RespTitle',
    respKeys: [
      'careers.v1Resp1',
      'careers.v1Resp2',
      'careers.v1Resp3',
      'careers.v1Resp4',
      'careers.v1Resp5',
      'careers.v1Resp6',
    ],
    reqTitleKey: 'careers.v1ReqTitle',
    reqKeys: ['careers.v1Req1', 'careers.v1Req2', 'careers.v1Req3', 'careers.v1Req4', 'careers.v1Req5'],
    niceTitleKey: 'careers.v1NiceTitle',
    niceKeys: ['careers.v1Nice1', 'careers.v1Nice2', 'careers.v1Nice3'],
    offerTitleKey: 'careers.v1OfferTitle',
    offerKeys: [
      'careers.v1Offer1',
      'careers.v1Offer2',
      'careers.v1Offer3',
      'careers.v1Offer4',
      'careers.v1Offer5',
    ],
    icon: Sparkles,
    accent: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.35)',
  },
  {
    id: 'n8n-developer',
    titleKey: 'careers.v2Title',
    tagKey: 'careers.v2Tag',
    shortKey: 'careers.v2Short',
    salaryKey: 'careers.v2Salary',
    typeKey: 'careers.v2Type',
    aboutTitleKey: 'careers.v2AboutTitle',
    aboutKey: 'careers.v2About',
    respTitleKey: 'careers.v2RespTitle',
    respKeys: [
      'careers.v2Resp1',
      'careers.v2Resp2',
      'careers.v2Resp3',
      'careers.v2Resp4',
      'careers.v2Resp5',
      'careers.v2Resp6',
    ],
    reqTitleKey: 'careers.v2ReqTitle',
    reqKeys: [
      'careers.v2Req1',
      'careers.v2Req2',
      'careers.v2Req3',
      'careers.v2Req4',
      'careers.v2Req5',
      'careers.v2Req6',
    ],
    niceTitleKey: 'careers.v2NiceTitle',
    niceKeys: ['careers.v2Nice1', 'careers.v2Nice2', 'careers.v2Nice3', 'careers.v2Nice4'],
    offerTitleKey: 'careers.v2OfferTitle',
    offerKeys: [
      'careers.v2Offer1',
      'careers.v2Offer2',
      'careers.v2Offer3',
      'careers.v2Offer4',
      'careers.v2Offer5',
    ],
    icon: Wrench,
    accent: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
];

type ApplyState = {
  name: string;
  email: string;
  telegram: string;
  portfolio: string;
  experience: string;
  salary: string;
  motivation: string;
};

const INITIAL_APPLY: ApplyState = {
  name: '',
  email: '',
  telegram: '',
  portfolio: '',
  experience: '',
  salary: '',
  motivation: '',
};

export default function CareersPage() {
  const { t, lang } = useLanguage();
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [applyForm, setApplyForm] = useState<ApplyState>(INITIAL_APPLY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyState, boolean>>>({});

  const { ref: heroRef, isVisible: heroVisible } = useReveal();
  const { ref: cultureRef, isVisible: cultureVisible } = useReveal();
  const { ref: posRef, isVisible: posVisible } = useReveal();
  const { ref: processRef, isVisible: processVisible } = useReveal();

  useEffect(() => {
    if (activeVacancy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVacancy]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVacancy(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const openApply = (v: Vacancy) => {
    setStatus('idle');
    setApplyForm(INITIAL_APPLY);
    setErrors({});
    setActiveVacancy(v);
  };

  const update = <K extends keyof ApplyState>(key: K, value: ApplyState[K]) => {
    setApplyForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const validate = () => {
    const e: Partial<Record<keyof ApplyState, boolean>> = {};
    if (applyForm.name.trim().length < 2) e.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applyForm.email.trim())) e.email = true;
    if (applyForm.telegram.trim().length < 2) e.telegram = true;
    if (!applyForm.experience) e.experience = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApplySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeVacancy) return;
    if (!validate()) return;

    setStatus('submitting');

    try {
      const parts = [
        `Position: ${t(activeVacancy.titleKey)} (${activeVacancy.id})`,
        `Experience: ${applyForm.experience}`,
        applyForm.salary ? `Expected rate: ${applyForm.salary}` : null,
        applyForm.telegram ? `Telegram: ${applyForm.telegram}` : null,
        applyForm.portfolio ? `Links: ${applyForm.portfolio}` : null,
        applyForm.motivation ? `Motivation: ${applyForm.motivation}` : null,
      ].filter(Boolean);

      const fullMessage = parts.join('\n');

      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          locale: lang,
          vertical: 'general',
          pageType: 'other',
          slug: `careers-${activeVacancy.id}`,
          sourceSection: `careers-apply-${activeVacancy.id}`,
          ctaType: 'generic',
          ctaVariant: 'primary',
          lead: {
            name: applyForm.name,
            email: applyForm.email,
            telegram: applyForm.telegram,
            portfolio: applyForm.portfolio,
            experience: applyForm.experience,
            expectedSalary: applyForm.salary,
            position: activeVacancy.id,
            message: fullMessage.length >= 10 ? fullMessage : `${fullMessage}\n(Job application)`,
          },
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const culture = [
    { icon: Globe, titleKey: 'careers.culture1Title', descKey: 'careers.culture1Desc' },
    { icon: Zap, titleKey: 'careers.culture2Title', descKey: 'careers.culture2Desc' },
    { icon: Rocket, titleKey: 'careers.culture3Title', descKey: 'careers.culture3Desc' },
    { icon: DollarSign, titleKey: 'careers.culture4Title', descKey: 'careers.culture4Desc' },
  ];

  const process = [
    { icon: Briefcase, titleKey: 'careers.process1Title', descKey: 'careers.process1Desc' },
    { icon: Phone, titleKey: 'careers.process2Title', descKey: 'careers.process2Desc' },
    { icon: FileCheck, titleKey: 'careers.process3Title', descKey: 'careers.process3Desc' },
    { icon: Award, titleKey: 'careers.process4Title', descKey: 'careers.process4Desc' },
  ];

  const inputBase =
    'w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 px-4 py-3 text-sm transition-colors focus:border-white/30 focus:bg-white/[0.06] focus:outline-none';

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
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
                radial-gradient(ellipse 70% 50% at 10% 100%, rgba(16, 185, 129, 0.07) 0%, transparent 60%)
              `,
            }}
          />
        </div>

        <div ref={heroRef} className="relative max-w-5xl mx-auto text-center">
          <div className={`reveal ${heroVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-emerald-500/25 bg-emerald-500/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                {t('careers.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-[1.05]">
              <span className="text-white">{t('careers.title1')}</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('careers.title2')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('careers.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="relative py-16 px-6">
        <div ref={cultureRef} className="relative max-w-6xl mx-auto">
          <div className={`mb-12 reveal ${cultureVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2 text-center">
              {t('careers.cultureTitle')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {culture.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${Math.min(idx + 1, 4)} ${
                    cultureVisible ? 'visible' : ''
                  } relative rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{t(c.titleKey)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t(c.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Positions */}
      <section id="positions" className="relative py-16 px-6">
        <div ref={posRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-10 reveal ${posVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-white/15 bg-white/[0.04]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                {t('careers.positionsCount')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('careers.positionsTitle')}
            </h2>
          </div>

          <div className="space-y-6">
            {VACANCIES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <article
                  key={v.id}
                  id={v.id}
                  className={`reveal reveal-delay-${idx + 1} ${
                    posVisible ? 'visible' : ''
                  } relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden group hover:border-white/20 transition-all duration-300 scroll-mt-28`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${v.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div
                    className="absolute top-0 right-0 w-80 h-80 opacity-15 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${v.accent} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative p-7 md:p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                      <div
                        className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 12px 32px ${v.glow}` }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                          {t(v.tagKey)}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                          {t(v.titleKey)}
                        </h3>
                        <p className="text-base text-gray-400 leading-relaxed mb-5">
                          {t(v.shortKey)}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-gray-300">
                            <MapPin className="w-3.5 h-3.5" />
                            {t('careers.remote')}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-gray-300">
                            <Clock className="w-3.5 h-3.5" />
                            {t(v.typeKey)}
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                            style={{
                              backgroundColor: `${v.accent}15`,
                              borderColor: `${v.accent}40`,
                              color: v.accent,
                            }}
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                            {t(v.salaryKey)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => openApply(v)}
                        className="btn-primary px-6 py-3 text-sm md:self-start"
                      >
                        <span>{t('careers.apply')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* About */}
                    <div className="mb-8 rounded-2xl bg-white/[0.02] border border-white/10 p-6">
                      <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                        {t(v.aboutTitleKey)}
                      </h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {t(v.aboutKey)}
                      </p>
                    </div>

                    {/* Responsibilities + Requirements */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.accent }} />
                          {t(v.respTitleKey)}
                        </h4>
                        <ul className="space-y-2.5">
                          {v.respKeys.map((k, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: v.accent }}
                              />
                              <span className="text-sm text-gray-300">{t(k)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.accent }} />
                          {t(v.reqTitleKey)}
                        </h4>
                        <ul className="space-y-2.5">
                          {v.reqKeys.map((k, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: v.accent }}
                              />
                              <span className="text-sm text-gray-300">{t(k)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Nice to have + Offer */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5">
                        <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                          {t(v.niceTitleKey)}
                        </h4>
                        <ul className="space-y-2">
                          {v.niceKeys.map((k, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="text-gray-600">+</span>
                              <span>{t(k)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="rounded-2xl border p-5"
                        style={{
                          backgroundColor: `${v.accent}0A`,
                          borderColor: `${v.accent}30`,
                        }}
                      >
                        <h4
                          className="text-xs font-bold mb-3 uppercase tracking-wider"
                          style={{ color: v.accent }}
                        >
                          {t(v.offerTitleKey)}
                        </h4>
                        <ul className="space-y-2">
                          {v.offerKeys.map((k, i) => (
                            <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                              <span style={{ color: v.accent }}>✓</span>
                              <span>{t(k)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-sm text-gray-500">
                        {t('careers.positionsCount')} · {t(v.salaryKey)}
                      </div>
                      <button
                        onClick={() => openApply(v)}
                        className="btn-primary px-6 py-3 text-sm"
                      >
                        <span>{t('careers.apply')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 px-6">
        <div ref={processRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-12 reveal ${processVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('careers.processTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${Math.min(idx + 1, 4)} ${
                    processVisible ? 'visible' : ''
                  } relative rounded-2xl p-6 border border-white/10 bg-white/[0.02] overflow-hidden`}
                >
                  <div className="absolute -top-4 -right-2 text-[90px] font-bold font-heading text-white/[0.03] leading-none select-none">
                    {idx + 1}
                  </div>
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t(p.titleKey)}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{t(p.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* No match CTA */}
      <section className="relative py-20 px-6">
        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t('careers.noMatchTitle')}
            </h2>
            <p className="text-base text-gray-400 mb-6 max-w-xl mx-auto">
              {t('careers.noMatchDesc')}
            </p>
            <a
              href="https://t.me/aiinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('careers.noMatchBtn')}</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Apply Modal */}
      {activeVacancy && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 md:p-8 overflow-y-auto bg-black/70"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => setActiveVacancy(null)}
        >
          <div
            className="relative w-full max-w-2xl my-auto rounded-3xl border border-white/15 bg-[#0c0c0e] shadow-2xl animate-modal-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${activeVacancy.gradient}`}
            />

            <button
              onClick={() => setActiveVacancy(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-7 md:p-10">
              {status === 'success' ? (
                <div className="py-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t('careers.applySuccess')}
                  </h3>
                  <button
                    onClick={() => setActiveVacancy(null)}
                    className="btn-secondary mt-4 px-6 py-3 text-sm"
                  >
                    <span>OK</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {t(activeVacancy.tagKey)}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {t('careers.applyTitle')}
                    </h3>
                    <p className="text-sm text-gray-400">
                      <span className="text-white font-semibold">{t(activeVacancy.titleKey)}</span> ·{' '}
                      {t('careers.applySubtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleApplySubmit} noValidate className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('careers.applyName')}
                        </label>
                        <input
                          type="text"
                          value={applyForm.name}
                          onChange={(e) => update('name', e.target.value)}
                          className={inputBase}
                          aria-invalid={!!errors.name}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('careers.applyEmail')}
                        </label>
                        <input
                          type="email"
                          value={applyForm.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={inputBase}
                          aria-invalid={!!errors.email}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('careers.applyTelegram')}
                        </label>
                        <input
                          type="text"
                          value={applyForm.telegram}
                          onChange={(e) => update('telegram', e.target.value)}
                          placeholder="@username"
                          className={inputBase}
                          aria-invalid={!!errors.telegram}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('careers.applySalary')}
                        </label>
                        <input
                          type="text"
                          value={applyForm.salary}
                          onChange={(e) => update('salary', e.target.value)}
                          placeholder={t('careers.applySalaryPh')}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t('careers.applyPortfolio')}
                      </label>
                      <input
                        type="text"
                        value={applyForm.portfolio}
                        onChange={(e) => update('portfolio', e.target.value)}
                        placeholder={t('careers.applyPortfolioPh')}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t('careers.applyExperience')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'junior', labelKey: 'careers.applyExpJunior' },
                          { id: 'mid', labelKey: 'careers.applyExpMid' },
                          { id: 'senior', labelKey: 'careers.applyExpSenior' },
                        ].map((opt) => {
                          const active = applyForm.experience === opt.id;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => update('experience', opt.id)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                                active
                                  ? 'bg-white text-black border-white'
                                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/25 hover:text-white'
                              }`}
                            >
                              {t(opt.labelKey)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t('careers.applyMotivation')}
                      </label>
                      <textarea
                        value={applyForm.motivation}
                        onChange={(e) => update('motivation', e.target.value)}
                        placeholder={t('careers.applyMotivationPh')}
                        rows={3}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/[0.08] px-4 py-3">
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-rose-200">{t('becomePartner.errorGeneric')}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary w-full px-8 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t('becomePartner.submitting')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('careers.applySubmit')}</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
