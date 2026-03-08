'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { getLastCtaAttribution, trackFormEvent } from '@/app/lib/analytics';

interface FinalCTAProps {
  status?: 'success' | 'error';
}

export default function FinalCTA({ status }: FinalCTAProps) {
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
      formType: 'audit-request',
      slug,
      sourceSection: 'audit',
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
          formType: 'audit-request',
          locale: 'uk',
          vertical: 'beauty',
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
        vertical: 'beauty',
        locale: 'uk',
      });

      if (!ok) {
        setState('error');
        setErrorMessage(data?.message || 'Не вдалося надіслати запит. Перевірте поля та спробуйте ще раз.');
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
        vertical: 'beauty',
        locale: 'uk',
      });
      setState('error');
      setErrorMessage('Не вдалося надіслати запит. Спробуйте ще раз.');
    }
  };

  return (
    <section ref={sectionRef} className="py-12 pb-20 px-6 content-visibility-auto" data-source-section="audit">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Готові перейти від хаосу до прогнозованої виручки?</h2>
        <p className="mt-3 text-gray-200 max-w-3xl">
          Отримайте аудит процесів салону з дорожньою картою на 30 днів: що автоматизувати першими, який ROI очікувати і
          як контролювати результат на рівні метрик.
        </p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-xl font-semibold text-white">Що входить в безкоштовний аудит</h3>
            <ul className="mt-3 text-gray-300 space-y-2 text-sm">
              <li>- Розбір воронки Instagram → запис → візит</li>
              <li>- Оцінка втрат від no-show і повільної відповіді</li>
              <li>- Пріоритетний план впровадження на 14–30 днів</li>
              <li>- Рекомендований стек і порядок запуску</li>
            </ul>
            <div className="mt-4 text-xs text-gray-400">Risk-reversal: стартуємо з MVP-блоку, який найшвидше впливає на касу.</div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">Прозорий KPI-план</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">Щотижневі ітерації</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">Без техно-хаосу</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-xl font-semibold text-white">Запит на аудит</h3>
            {state === 'success' ? (
              <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/15 p-3 text-sm text-emerald-100">
                Дякуємо! Ваш запит на аудит отримано. Ми зв’яжемося з вами найближчим часом.
              </p>
            ) : state === 'error' ? (
              <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                {errorMessage || 'Не вдалося надіслати запит. Перевірте поля та спробуйте ще раз.'}
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
                <span className="text-sm text-gray-300">Телефон</span>
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
              <label className="block">
                <span className="text-sm text-gray-300">Записів на місяць</span>
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
                className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:hover:bg-white"
              >
                {state === 'loading' ? 'Відправляємо…' : 'Отримати аудит і дорожню карту'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-300">
          Потрібні приклади впроваджень?{' '}
          <Link href="/uk/cases" className="text-white underline underline-offset-4">
            Переглянути кейси
          </Link>
        </div>
      </div>
    </section>
  );
}
