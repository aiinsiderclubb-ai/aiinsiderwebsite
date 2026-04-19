'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  TrendingUp,
  Repeat,
  FileText,
  UserCheck,
  LineChart as LineChartIcon,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { useReveal } from '@/app/hooks/useReveal';

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  partnerType: string;
  audience: string;
  expected: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  partnerType: '',
  audience: '',
  expected: '',
  message: '',
};

export default function BecomePartnerPage() {
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const { ref: heroRef, isVisible: heroVisible } = useReveal();

  const partnerTypes = [
    { id: 'agency', labelKey: 'becomePartner.typeAgency' },
    { id: 'freelancer', labelKey: 'becomePartner.typeFreelancer' },
    { id: 'influencer', labelKey: 'becomePartner.typeInfluencer' },
    { id: 'sales', labelKey: 'becomePartner.typeSales' },
    { id: 'other', labelKey: 'becomePartner.typeOther' },
  ];

  const audienceOptions = [
    { id: 'under500', labelKey: 'becomePartner.audience1' },
    { id: '500_5k', labelKey: 'becomePartner.audience2' },
    { id: '5k_50k', labelKey: 'becomePartner.audience3' },
    { id: 'over50k', labelKey: 'becomePartner.audience4' },
  ];

  const expectedOptions = [
    { id: '1_3', labelKey: 'becomePartner.expected1' },
    { id: '4_10', labelKey: 'becomePartner.expected2' },
    { id: 'over10', labelKey: 'becomePartner.expected3' },
  ];

  const sideBenefits = [
    { icon: TrendingUp, key: 'becomePartner.side1' },
    { icon: Repeat, key: 'becomePartner.side2' },
    { icon: FileText, key: 'becomePartner.side3' },
    { icon: UserCheck, key: 'becomePartner.side4' },
    { icon: LineChartIcon, key: 'becomePartner.side5' },
  ];

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: false }));
  };

  const validate = () => {
    const errors: Partial<Record<keyof FormState, boolean>> = {};
    if (form.name.trim().length < 2) errors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = true;
    if (!form.partnerType) errors.partnerType = true;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const partnerTypeLabel =
        partnerTypes.find((p) => p.id === form.partnerType)?.labelKey ?? '';
      const audienceLabel = audienceOptions.find((a) => a.id === form.audience)?.labelKey ?? '';
      const expectedLabel = expectedOptions.find((x) => x.id === form.expected)?.labelKey ?? '';

      const messageParts = [
        `Partner type: ${partnerTypeLabel ? t(partnerTypeLabel) : form.partnerType}`,
        form.audience ? `Audience size: ${t(audienceLabel)}` : null,
        form.expected ? `Expected leads/month: ${t(expectedLabel)}` : null,
        form.company ? `Company: ${form.company}` : null,
        form.phone ? `Telegram/phone: ${form.phone}` : null,
        form.message ? `Why: ${form.message}` : null,
      ].filter(Boolean);

      const fullMessage = messageParts.join('\n');

      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          locale: lang,
          vertical: 'general',
          pageType: 'other',
          slug: 'become-partner',
          sourceSection: 'become-partner',
          ctaType: 'generic',
          ctaVariant: 'primary',
          lead: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            partnerType: form.partnerType,
            audience: form.audience,
            expectedLeads: form.expected,
            message: fullMessage.length >= 10 ? fullMessage : `${fullMessage}\n(Partner application)`,
          },
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setForm(INITIAL_STATE);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 px-4 py-3 text-sm transition-colors focus:border-white/30 focus:bg-white/[0.06] focus:outline-none';

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 20% 10%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div ref={heroRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-12 reveal ${heroVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-violet-500/25 bg-violet-500/[0.08]">
              <Handshake className="w-4 h-4 text-violet-300" />
              <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
                {t('becomePartner.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 leading-[1.05]">
              <span className="text-white">{t('becomePartner.title1')}</span>{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('becomePartner.title2')}
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t('becomePartner.subtitle')}
            </p>
          </div>

          {/* Form + sidebar */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 mt-10">
            {/* Form */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 md:p-10 overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="relative">
                {status === 'success' ? (
                  <div className="py-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-5">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t('becomePartner.successTitle')}
                    </h2>
                    <p className="text-base text-gray-400 max-w-md mx-auto mb-8">
                      {t('becomePartner.successDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link href={`${basePath}/partners`} className="btn-secondary px-6 py-3 text-sm">
                        <span>← {t('partners.learnMore')}</span>
                      </Link>
                      <a
                        href="https://t.me/aiinsider"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-6 py-3 text-sm"
                      >
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.nameLabel')}
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder={t('becomePartner.namePlaceholder')}
                          className={inputBase}
                          aria-invalid={!!fieldErrors.name}
                        />
                        {fieldErrors.name && (
                          <p className="text-xs text-rose-400 mt-1.5">{t('becomePartner.required')}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.emailLabel')}
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder={t('becomePartner.emailPlaceholder')}
                          className={inputBase}
                          aria-invalid={!!fieldErrors.email}
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-rose-400 mt-1.5">{t('becomePartner.required')}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.phoneLabel')}
                        </label>
                        <input
                          type="text"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder={t('becomePartner.phonePlaceholder')}
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.companyLabel')}
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update('company', e.target.value)}
                          placeholder={t('becomePartner.companyPlaceholder')}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t('becomePartner.typeLabel')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {partnerTypes.map((pt) => {
                          const active = form.partnerType === pt.id;
                          return (
                            <button
                              type="button"
                              key={pt.id}
                              onClick={() => update('partnerType', pt.id)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                                active
                                  ? 'bg-white text-black border-white'
                                  : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/25 hover:text-white'
                              }`}
                            >
                              {t(pt.labelKey)}
                            </button>
                          );
                        })}
                      </div>
                      {fieldErrors.partnerType && (
                        <p className="text-xs text-rose-400 mt-1.5">{t('becomePartner.required')}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.audienceLabel')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {audienceOptions.map((a) => {
                            const active = form.audience === a.id;
                            return (
                              <button
                                type="button"
                                key={a.id}
                                onClick={() => update('audience', active ? '' : a.id)}
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                  active
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/25 hover:text-white'
                                }`}
                              >
                                {t(a.labelKey)}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t('becomePartner.expectedLabel')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {expectedOptions.map((x) => {
                            const active = form.expected === x.id;
                            return (
                              <button
                                type="button"
                                key={x.id}
                                onClick={() => update('expected', active ? '' : x.id)}
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                  active
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/25 hover:text-white'
                                }`}
                              >
                                {t(x.labelKey)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t('becomePartner.messageLabel')}
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder={t('becomePartner.messagePlaceholder')}
                        rows={4}
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
                          <span>{t('becomePartner.submitBtn')}</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar: side benefits */}
            <aside className="relative">
              <div className="sticky top-28 rounded-3xl border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-xl font-bold text-white mb-5">{t('becomePartner.sideTitle')}</h3>
                <ul className="space-y-4">
                  {sideBenefits.map((b, idx) => {
                    const Icon = b.icon;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-violet-500/15 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-violet-300" />
                        </div>
                        <span className="text-sm text-gray-300 leading-relaxed pt-1.5">
                          {t(b.key)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link
                    href={`${basePath}/partners`}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>← {t('partners.learnMore')}</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
