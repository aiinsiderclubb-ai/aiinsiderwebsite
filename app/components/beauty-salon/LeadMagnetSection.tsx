'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getLastCtaAttribution, trackFormEvent } from '@/app/lib/analytics';

interface LeadMagnetSectionProps {
  status?: 'success' | 'error';
}

export default function LeadMagnetSection({ status }: LeadMagnetSectionProps) {
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
            vertical: 'beauty',
            locale: 'uk',
          });
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      vertical: 'beauty',
      locale: 'uk',
    });

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formType: 'lead-magnet',
          locale: 'uk',
          vertical: 'beauty',
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
        vertical: 'beauty',
        locale: 'uk',
      });

      if (!ok) {
        setState('error');
        setErrorMessage(data?.message || 'Не вдалося надіслати форму. Перевірте поля та спробуйте ще раз.');
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
        vertical: 'beauty',
        locale: 'uk',
      });
      setState('error');
      setErrorMessage('Не вдалося надіслати форму. Спробуйте ще раз.');
    }
  };

  return (
    <section ref={sectionRef} id="lead-magnet" className="py-12 px-6 content-visibility-auto" data-source-section="lead-magnet">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold text-white">Чек-лист автоматизації салону краси</h2>
          <p className="mt-3 text-gray-300">
            PDF на 15 пунктів: як прибрати no-show, не губити ліди в Direct і підняти repeat sales без хаосу в команді.
          </p>
          <ul className="mt-4 list-disc ml-5 text-sm text-gray-300 space-y-1">
            <li>Контрольний список процесів до запуску</li>
            <li>Шаблон базових KPI салону</li>
            <li>Матриця пріоритетів для впровадження</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">Завантажити чек-лист</h3>
          <p className="mt-2 text-sm text-gray-400">Отримаєте PDF на email + шаблон для розрахунку втрат.</p>

          {state === 'success' ? (
            <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/15 p-3 text-sm text-emerald-100">
              Дякуємо! Заявка прийнята. Ми надішлемо чек-лист на вашу пошту.
            </p>
          ) : state === 'error' ? (
            <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100">
              {errorMessage || 'Не вдалося надіслати форму. Перевірте поля та спробуйте ще раз.'}
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
              <span className="text-sm text-gray-300">Ім'я</span>
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
              <span className="text-sm text-gray-300">Email</span>
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
              <span className="text-sm text-gray-300">Розмір салону</span>
              <select
                name="salonSize"
                required
                value={form.salonSize}
                onChange={(e) => setForm((p) => ({ ...p, salonSize: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
              >
                <option value="">Оберіть</option>
                <option value="1-2">1–2 майстри</option>
                <option value="3-7">3–7 майстрів</option>
                <option value="8-15">8–15 майстрів</option>
                <option value="15+">15+ майстрів</option>
              </select>
            </label>
            <button
              type="submit"
              data-cta="lead-magnet-submit"
              disabled={state === 'loading'}
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:hover:bg-white"
            >
              {state === 'loading' ? 'Відправляємо…' : 'Отримати чек-лист'}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
