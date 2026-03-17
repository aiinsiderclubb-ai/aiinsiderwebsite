'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getLastCtaAttribution, trackFormEvent } from '@/app/lib/analytics';
import type { LeadMagnetConfig, VerticalId, VerticalLocale } from '@/app/lib/verticals/types';

interface LeadMagnetSectionProps {
  status?: 'success' | 'error';
  content: LeadMagnetConfig;
  vertical: VerticalId;
  locale: VerticalLocale;
  accentGradient?: string;
  glowRgb?: string;
}

export default function LeadMagnetSection({
  status,
  content,
  vertical,
  locale,
  accentGradient = 'from-rose-400 to-pink-500',
  glowRgb = '244, 63, 94',
}: LeadMagnetSectionProps) {
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
    <section ref={sectionRef} id="lead-magnet" className="relative py-20 px-6 overflow-hidden" data-source-section="lead-magnet">
      {/* Glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 right-1/4 w-[600px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.1) 0%, transparent 60%)`, filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Info card — gradient left border, rich background */}
        <article
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 overflow-hidden transition-all duration-300 hover:border-white/20"
        >
          {/* Colored left border line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-3xl"
            style={{ background: `linear-gradient(to bottom, rgba(${glowRgb}, 1), rgba(${glowRgb}, 0.2))` }}
          />
          {/* Background watermark */}
          <div
            className="absolute bottom-4 right-6 text-8xl font-black leading-none select-none"
            style={{ color: `rgba(${glowRgb}, 0.05)` }}
          >
            PDF
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">{content.title}</h2>
          <p className="mt-3 text-gray-400 leading-relaxed">{content.description}</p>
          <ul className="mt-5 space-y-3">
            {content.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-gray-300">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                  style={{
                    background: `rgba(${glowRgb}, 0.15)`,
                    color: `rgba(${glowRgb}, 1)`,
                    border: `1px solid rgba(${glowRgb}, 0.3)`,
                  }}
                >
                  ✓
                </div>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Form card */}
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20">
          <h3 className="text-xl font-bold text-white">{content.form.title}</h3>
          <p className="mt-2 text-sm text-gray-400">{content.form.subtitle}</p>

          {state === 'success' ? (
            <p className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              {content.form.successMessage}
            </p>
          ) : state === 'error' ? (
            <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
              {errorMessage || content.form.errorMessage}
            </p>
          ) : null}

          <form
            action="/api/lead-magnet"
            method="post"
            onSubmit={onSubmit}
            className="mt-5 space-y-4"
            data-form-type="lead-magnet"
            data-cta="lead-magnet-form"
          >
            <input type="hidden" name="ctaType" value="generic" />
            <input type="hidden" name="ctaVariant" value="unknown" />
            <label className="block">
              <span className="text-sm font-medium text-gray-300">{content.form.fields.nameLabel}</span>
              <input
                name="name"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-white/40 placeholder:text-gray-600"
                style={{
                  ['--focus-ring' as string]: `rgba(${glowRgb}, 0.4)`,
                }}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-300">{content.form.fields.emailLabel}</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-white/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-300">{content.form.fields.salonSizeLabel}</span>
              <select
                name="salonSize"
                required
                value={form.salonSize}
                onChange={(e) => setForm((p) => ({ ...p, salonSize: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition-colors focus:border-white/40"
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
              className="w-full rounded-full px-5 py-3.5 font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{
                background: `linear-gradient(135deg, rgba(${glowRgb}, 1) 0%, rgba(${glowRgb}, 0.7) 100%)`,
                boxShadow: `0 10px 30px rgba(${glowRgb}, 0.35)`,
              }}
            >
              {state === 'loading' ? content.form.submittingLabel : content.form.submitLabel}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
