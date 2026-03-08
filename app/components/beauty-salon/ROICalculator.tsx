'use client';

import { useMemo, useRef, useState } from 'react';
import { trackRoiInteraction } from '@/app/lib/analytics';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatUAH(value: number) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ROICalculator() {
  const [monthlyBookings, setMonthlyBookings] = useState(420);
  const [averageCheck, setAverageCheck] = useState(1000);
  const [noShowRate, setNoShowRate] = useState(12);
  const [instagramLeads, setInstagramLeads] = useState(380);
  const [responseMinutes, setResponseMinutes] = useState(20);
  const interacted = useRef(false);

  const result = useMemo(() => {
    const noShowLoss = monthlyBookings * (noShowRate / 100) * averageCheck;
    const responsePenaltyRate = clamp((responseMinutes - 2) * 0.015, 0, 0.35);
    const lostInstagramRevenue = instagramLeads * responsePenaltyRate * averageCheck;

    const estimatedMonthlyLoss = noShowLoss + lostInstagramRevenue;
    const potentialRevenueRecovery = noShowLoss * 0.4 + lostInstagramRevenue * 0.5;

    return {
      noShowLoss,
      lostInstagramRevenue,
      estimatedMonthlyLoss,
      potentialRevenueRecovery,
    };
  }, [averageCheck, instagramLeads, monthlyBookings, noShowRate, responseMinutes]);

  return (
    <div className="grid lg:grid-cols-2 gap-6" data-source-section="roi-calculator">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <h3 className="text-xl font-bold text-white mb-4">ROI-калькулятор салону краси</h3>
        <p className="text-sm text-gray-400 mb-6">
          Введіть свої поточні дані, щоб оцінити щомісячні втрати та потенціал від автоматизації.
        </p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Кількість записів на місяць</span>
            <input
              type="number"
              min={0}
              value={monthlyBookings}
              onChange={(e) => setMonthlyBookings(Number(e.target.value) || 0)}
              onFocus={() => {
                if (interacted.current) return;
                interacted.current = true;
                trackRoiInteraction({ action: 'start', field: 'monthlyBookings', sourceSection: 'roi-calculator' });
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Середній чек (грн)</span>
            <input
              type="number"
              min={0}
              value={averageCheck}
              onChange={(e) => setAverageCheck(Number(e.target.value) || 0)}
              onFocus={() => {
                if (interacted.current) return;
                interacted.current = true;
                trackRoiInteraction({ action: 'start', field: 'averageCheck', sourceSection: 'roi-calculator' });
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">No-show (%)</span>
            <input
              type="number"
              min={0}
              max={100}
              value={noShowRate}
              onChange={(e) => setNoShowRate(Number(e.target.value) || 0)}
              onFocus={() => {
                if (interacted.current) return;
                interacted.current = true;
                trackRoiInteraction({ action: 'start', field: 'noShowRate', sourceSection: 'roi-calculator' });
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Instagram-ліди на місяць</span>
            <input
              type="number"
              min={0}
              value={instagramLeads}
              onChange={(e) => setInstagramLeads(Number(e.target.value) || 0)}
              onFocus={() => {
                if (interacted.current) return;
                interacted.current = true;
                trackRoiInteraction({ action: 'start', field: 'instagramLeads', sourceSection: 'roi-calculator' });
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Середній час відповіді в Direct (хв)</span>
            <input
              type="number"
              min={0}
              value={responseMinutes}
              onChange={(e) => setResponseMinutes(Number(e.target.value) || 0)}
              onFocus={() => {
                if (interacted.current) return;
                interacted.current = true;
                trackRoiInteraction({ action: 'start', field: 'responseMinutes', sourceSection: 'roi-calculator' });
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6">
        <h3 className="text-xl font-bold text-white mb-5">Оцінка фінансового ефекту</h3>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">Втрати через no-show</p>
            <p className="text-2xl font-bold text-white">{formatUAH(result.noShowLoss)}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">Втрати через повільний Direct</p>
            <p className="text-2xl font-bold text-white">{formatUAH(result.lostInstagramRevenue)}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">Орієнтовні загальні втрати / місяць</p>
            <p className="text-3xl font-bold text-rose-300">{formatUAH(result.estimatedMonthlyLoss)}</p>
          </div>

          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-4">
            <p className="text-sm text-emerald-100">Потенціал повернення виручки / місяць</p>
            <p className="text-3xl font-bold text-emerald-200">{formatUAH(result.potentialRevenueRecovery)}</p>
          </div>
        </div>

        <a
          href="#audit-form"
          data-cta="roi-calculator"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors"
        >
          Отримати персональний план по цифрах
        </a>
      </div>
    </div>
  );
}
