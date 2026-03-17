'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getLastCtaAttribution, trackFormEvent } from '@/app/lib/analytics';
import type { FinalCtaConfig, VerticalId, VerticalLocale } from '@/app/lib/verticals/types';

interface FinalCTAProps {
  status?: 'success' | 'error';
  content: FinalCtaConfig;
  vertical: VerticalId;
  locale: VerticalLocale;
}

export default function FinalCTA({ status, content, vertical, locale }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', salonSize: '', monthlyBookings: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(() => {
    if (status === 'success') return 'success';
    if (status === 'error') return 'error';
    return 'idle';
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;
    let fired = false;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!fired && entry.isIntersecting) {
          fired = true;
          const slug = window.location.pathname;
          const last = getLastCtaAttribution();
          const ctaType = last.ctaType || 'generic';
          const ctaVariant = last.ctaVariant || 'unknown';
          trackFormEvent({
            action: 'view',
            formType: 'audit-request',
            slug,
            sourceSection: 'audit',
            ctaType,
            ctaVariant,
            pageType: 'pillar',
            vertical,
            locale,
          });
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [locale, vertical]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === 'loading') return;

    const slug = typeof window !== 'undefined' ? window.location.pathname : undefined;
    const last = getLastCtaAttribution();
    const ctaType = last.ctaType || 'generic';
    const ctaVariant = last.ctaVariant || 'unknown';

    setState('loading');
    setErrorMessage(null);

    trackFormEvent({
      action: 'submit',
      formType: 'audit-request',
      slug,
      sourceSection: 'audit',
      ctaType,
      ctaVariant,
      pageType: 'pillar',
      vertical,
      locale,
    });

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formType: 'audit-request',
          locale,
          vertical,
          pageType: 'pillar',
          slug,
          sourceSection: 'audit',
          ctaType,
          ctaVariant,
          lead: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            salonSize: form.salonSize,
            monthlyBookings: Number(form.monthlyBookings),
          },
        }),
      });

      const data = (await res.json().catch(() => null)) as any;
      const ok = Boolean(res.ok && data?.ok);

      trackFormEvent({
        action: ok ? 'success' : 'error',
        formType: 'audit-request',
        slug,
        sourceSection: 'audit',
        ctaType,
        ctaVariant,
        pageType: 'pillar',
        vertical,
        locale,
      });

      if (!ok) {
        setState('error');
        setErrorMessage(data?.message || content.form.errorMessage);
        return;
      }

      setState('success');
      setForm({ name: '', phone: '', salonSize: '', monthlyBookings: '' });
    } catch {
      trackFormEvent({
        action: 'error',
        formType: 'audit-request',
        slug,
        sourceSection: 'audit',
        ctaType,
        ctaVariant,
        pageType: 'pillar',
        vertical,
        locale,
      });
      setState('error');
      setErrorMessage(content.form.networkErrorMessage);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden" data-source-section="audit">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">{content.title}</h2>
        <p className="mt-3 text-gray-200 max-w-3xl">{content.subtitle}</p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-xl font-semibold text-white">{content.benefits.title}</h3>
            <ul className="mt-3 text-gray-300 space-y-2 text-sm">
              {content.benefits.bullets.map((b) => (
                <li key={b}>- {b}</li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-400">{content.benefits.riskReversal}</div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {content.benefits.chips.map((c) => (
                <span key={c} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-xl font-semibold text-white">{content.form.title}</h3>
            {state === 'success' ? (
              <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/15 p-3 text-sm text-emerald-100">
                {content.form.successMessage}
              </p>
            ) : state === 'error' ? (
              <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                {errorMessage || content.form.errorMessage}
              </p>
            ) : null}
            <form
              id="audit-form"
              action="/api/audit-request"
              method="post"
              onSubmit={onSubmit}
              className="mt-4 space-y-3"
              data-form-type="audit-request"
              data-cta="audit-form"
            >
              <input type="hidden" name="ctaType" value="generic" />
              <input type="hidden" name="ctaVariant" value="unknown" />
              <label className="block">
                <span className="text-sm text-gray-300">{content.form.fields.nameLabel}</span>
                <input
                  name="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">{content.form.fields.phoneLabel}</span>
                <input
                  name="phone"
                  required
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">{content.form.fields.salonSizeLabel}</span>
                <select
                  name="salonSize"
                  required
                  value={form.salonSize}
                  onChange={(e) => setForm((p) => ({ ...p, salonSize: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
                >
                  <option value="">{content.form.fields.salonSizePlaceholder}</option>
                  {content.form.fields.salonSizeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">{content.form.fields.monthlyBookingsLabel}</span>
                <input
                  type="number"
                  name="monthlyBookings"
                  required
                  min={1}
                  value={form.monthlyBookings}
                  onChange={(e) => setForm((p) => ({ ...p, monthlyBookings: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
                />
              </label>
              <button
                type="submit"
                data-cta="audit-submit"
                disabled={state === 'loading'}
                className="w-full rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:hover:bg-white"
              >
                {state === 'loading' ? content.form.submittingLabel : content.form.submitLabel}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-300">
          {content.bottomLinkText}{' '}
          <Link href={content.bottomLink.href} className="text-white underline underline-offset-4">
            {content.bottomLink.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
