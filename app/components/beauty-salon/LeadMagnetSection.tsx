'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getLastCtaAttribution, trackFormEvent } from '@/app/lib/analytics';
import type { LeadMagnetConfig, VerticalId, VerticalLocale } from '@/app/lib/verticals/types';

interface LeadMagnetSectionProps {
  status?: 'success' | 'error';
  content: LeadMagnetConfig;
  vertical: VerticalId;
  locale: VerticalLocale;
}

export default function LeadMagnetSection({ status, content, vertical, locale }: LeadMagnetSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({ name: '', email: '', salonSize: '' });
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
            formType: 'lead-magnet',
            slug,
            sourceSection: 'lead-magnet',
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
      formType: 'lead-magnet',
      slug,
      sourceSection: 'lead-magnet',
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
          formType: 'lead-magnet',
          locale,
          vertical,
          pageType: 'pillar',
          slug,
          sourceSection: 'lead-magnet',
          ctaType,
          ctaVariant,
          lead: {
            name: form.name.trim(),
            email: form.email.trim(),
            salonSize: form.salonSize,
          },
        }),
      });

      const data = (await res.json().catch(() => null)) as any;
      const ok = Boolean(res.ok && data?.ok);

      trackFormEvent({
        action: ok ? 'success' : 'error',
        formType: 'lead-magnet',
        slug,
        sourceSection: 'lead-magnet',
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
      setForm({ name: '', email: '', salonSize: '' });
    } catch {
      trackFormEvent({
        action: 'error',
        formType: 'lead-magnet',
        slug,
        sourceSection: 'lead-magnet',
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
    <section ref={sectionRef} id="lead-magnet" className="py-12 px-6 content-visibility-auto" data-source-section="lead-magnet">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold text-white">{content.title}</h2>
          <p className="mt-3 text-gray-300">{content.description}</p>
          <ul className="mt-4 list-disc ml-5 text-sm text-gray-300 space-y-1">
            {content.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">{content.form.title}</h3>
          <p className="mt-2 text-sm text-gray-400">{content.form.subtitle}</p>

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
            action="/api/lead-magnet"
            method="post"
            onSubmit={onSubmit}
            className="mt-4 space-y-3"
            data-form-type="lead-magnet"
            data-cta="lead-magnet-form"
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
              <span className="text-sm text-gray-300">{content.form.fields.emailLabel}</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
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
            <button
              type="submit"
              data-cta="lead-magnet-submit"
              disabled={state === 'loading'}
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:hover:bg-white"
            >
              {state === 'loading' ? content.form.submittingLabel : content.form.submitLabel}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
