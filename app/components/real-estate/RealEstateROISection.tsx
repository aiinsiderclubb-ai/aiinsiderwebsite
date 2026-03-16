'use client';

import { useMemo, useState } from 'react';

function formatUAH(value: number) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatHours(value: number) {
  return new Intl.NumberFormat('uk-UA', {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RealEstateROISection() {
  const [monthlyLeads, setMonthlyLeads] = useState(180);

  const result = useMemo(() => {
    const leads = Math.max(0, monthlyLeads);
    const hoursSaved = leads * 0.45;
    const automationCost = 45000 + leads * 35;
    const managerCost = 65000 + leads * 80;
    const monthlyDelta = Math.max(0, managerCost - automationCost);

    return {
      hoursSaved,
      automationCost,
      managerCost,
      monthlyDelta,
    };
  }, [monthlyLeads]);

  return (
    <section id="roi-calculator" className="py-12 px-6 content-visibility-auto" data-source-section="roi">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Порахуйте вашу економію</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          Введіть кількість лідів на місяць і подивіться, скільки годин забирає ручна обробка та як змінюється економіка між AI-автоматизацією й наймом окремого менеджера.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Вхідні дані</h3>
            <label className="mt-5 block">
              <span className="text-sm text-gray-300">Кількість лідів на місяць</span>
              <input
                type="number"
                min={0}
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/40"
              />
            </label>
            <p className="mt-4 text-sm text-gray-400">
              Модель орієнтовна: виходимо з того, що один lead забирає близько 27 хвилин на дзвінки, кваліфікацію, CRM-оновлення і follow-up.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-bold text-white">Оцінка ефекту / місяць</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Час, який забирає рутина</p>
                <p className="text-3xl font-bold text-white">{formatHours(result.hoursSaved)} годин</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Орієнтовна вартість AI-автоматизації</p>
                <p className="text-2xl font-bold text-white">{formatUAH(result.automationCost)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Орієнтовна вартість найму менеджера</p>
                <p className="text-2xl font-bold text-white">{formatUAH(result.managerCost)}</p>
              </div>
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-4">
                <p className="text-sm text-emerald-100">Потенційна економія</p>
                <p className="text-3xl font-bold text-emerald-200">{formatUAH(result.monthlyDelta)}</p>
              </div>
            </div>

            <a
              href="#bookcall"
              data-cta="real-estate-roi"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
            >
              Замовити консультацію
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
