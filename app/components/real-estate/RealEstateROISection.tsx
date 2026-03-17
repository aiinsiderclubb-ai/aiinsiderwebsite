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

interface RealEstateROISectionProps {
  accentGradient?: string;
  glowRgb?: string;
}

export default function RealEstateROISection({
  accentGradient = 'from-blue-400 to-cyan-500',
  glowRgb = '59, 130, 246',
}: RealEstateROISectionProps) {
  const [monthlyLeads, setMonthlyLeads] = useState(180);

  const result = useMemo(() => {
    const leads = Math.max(0, monthlyLeads);
    const hoursSaved = leads * 0.45;
    const automationCost = 45000 + leads * 35;
    const managerCost = 65000 + leads * 80;
    const monthlyDelta = Math.max(0, managerCost - automationCost);

    return { hoursSaved, automationCost, managerCost, monthlyDelta };
  }, [monthlyLeads]);

  return (
    <section id="roi-calculator" className="relative py-20 px-6 overflow-hidden" data-source-section="roi">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/4 w-[600px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.1) 0%, transparent 60%)`, filter: 'blur(80px)' }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">ROI</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">Порахуйте вашу економію</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">
          Введіть кількість лідів на місяць і подивіться, скільки годин забирає ручна обробка та як змінюється економіка між AI-автоматизацією й наймом окремого менеджера.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20">
            <h3 className="text-xl font-bold text-white mb-5">Вхідні дані</h3>
            <label className="block">
              <span className="text-sm font-medium text-gray-300">Кількість лідів на місяць</span>
              <input
                type="number"
                min={0}
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/40 transition-colors"
              />
            </label>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Модель орієнтовна: виходимо з того, що один lead забирає близько 27 хвилин на дзвінки, кваліфікацію, CRM-оновлення і follow-up.
            </p>
          </div>

          {/* Results card */}
          <div
            className="rounded-3xl border p-6"
            style={{ borderColor: `rgba(${glowRgb}, 0.25)`, background: `rgba(${glowRgb}, 0.05)` }}
          >
            <h3 className="text-xl font-bold text-white mb-5">Оцінка ефекту / місяць</h3>
            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Час, який забирає рутина</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                  {formatHours(result.hoursSaved)} годин
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Орієнтовна вартість AI-автоматизації</p>
                <p className="text-2xl font-bold text-white">{formatUAH(result.automationCost)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Орієнтовна вартість найму менеджера</p>
                <p className="text-2xl font-bold text-white">{formatUAH(result.managerCost)}</p>
              </div>
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: `rgba(${glowRgb}, 0.35)`, background: `rgba(${glowRgb}, 0.12)` }}
              >
                <p className="text-sm text-white/80">Потенційна економія</p>
                <p className="text-3xl font-bold text-white">{formatUAH(result.monthlyDelta)}</p>
              </div>
            </div>

            <a
              href="#bookcall"
              data-cta="real-estate-roi"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, rgba(${glowRgb}, 1) 0%, rgba(${glowRgb}, 0.7) 100%)`,
                boxShadow: `0 10px 30px rgba(${glowRgb}, 0.35)`,
              }}
            >
              Замовити консультацію
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
