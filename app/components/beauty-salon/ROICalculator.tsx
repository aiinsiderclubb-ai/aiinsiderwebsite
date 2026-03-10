'use client';

import { useMemo, useRef, useState } from 'react';
import { trackRoiInteraction } from '@/app/lib/analytics';
import type { RoiCalculatorConfig, RoiCalculatorFieldConfig } from '@/app/lib/verticals/types';

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

export default function ROICalculator({ content }: { content: RoiCalculatorConfig }) {
  const getDefault = (key: RoiCalculatorFieldConfig['key']) =>
    content.fields.find((f) => f.key === key)?.defaultValue ?? 0;

  const fieldLabel = (key: RoiCalculatorFieldConfig['key']) => content.fields.find((f) => f.key === key)?.label || '';
  const fieldMin = (key: RoiCalculatorFieldConfig['key']) => content.fields.find((f) => f.key === key)?.min;
  const fieldMax = (key: RoiCalculatorFieldConfig['key']) => content.fields.find((f) => f.key === key)?.max;
  const resultLabel = (key: 'noShowLoss' | 'lostInstagramRevenue' | 'estimatedMonthlyLoss' | 'potentialRevenueRecovery') =>
    content.results.find((r) => r.key === key)?.label || '';

  const [monthlyBookings, setMonthlyBookings] = useState(() => getDefault('monthlyBookings'));
  const [averageCheck, setAverageCheck] = useState(() => getDefault('averageCheck'));
  const [noShowRate, setNoShowRate] = useState(() => getDefault('noShowRate'));
  const [instagramLeads, setInstagramLeads] = useState(() => getDefault('instagramLeads'));
  const [responseMinutes, setResponseMinutes] = useState(() => getDefault('responseMinutes'));
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
        <h3 className="text-xl font-bold text-white mb-4">{content.title}</h3>
        <p className="text-sm text-gray-400 mb-6">
          {content.subtitle}
        </p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">{fieldLabel('monthlyBookings')}</span>
            <input
              type="number"
              min={fieldMin('monthlyBookings') ?? 0}
              max={fieldMax('monthlyBookings')}
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
            <span className="text-sm text-gray-300">{fieldLabel('averageCheck')}</span>
            <input
              type="number"
              min={fieldMin('averageCheck') ?? 0}
              max={fieldMax('averageCheck')}
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
            <span className="text-sm text-gray-300">{fieldLabel('noShowRate')}</span>
            <input
              type="number"
              min={fieldMin('noShowRate') ?? 0}
              max={fieldMax('noShowRate') ?? 100}
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
            <span className="text-sm text-gray-300">{fieldLabel('instagramLeads')}</span>
            <input
              type="number"
              min={fieldMin('instagramLeads') ?? 0}
              max={fieldMax('instagramLeads')}
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
            <span className="text-sm text-gray-300">{fieldLabel('responseMinutes')}</span>
            <input
              type="number"
              min={fieldMin('responseMinutes') ?? 0}
              max={fieldMax('responseMinutes')}
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
        <h3 className="text-xl font-bold text-white mb-5">{content.resultsTitle}</h3>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">{resultLabel('noShowLoss')}</p>
            <p className="text-2xl font-bold text-white">{formatUAH(result.noShowLoss)}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">{resultLabel('lostInstagramRevenue')}</p>
            <p className="text-2xl font-bold text-white">{formatUAH(result.lostInstagramRevenue)}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-gray-400">{resultLabel('estimatedMonthlyLoss')}</p>
            <p className="text-3xl font-bold text-rose-300">{formatUAH(result.estimatedMonthlyLoss)}</p>
          </div>

          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-4">
            <p className="text-sm text-emerald-100">{resultLabel('potentialRevenueRecovery')}</p>
            <p className="text-3xl font-bold text-emerald-200">{formatUAH(result.potentialRevenueRecovery)}</p>
          </div>
        </div>

        <a
          href={content.cta.href}
          data-cta="roi-calculator"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors"
        >
          {content.cta.label}
        </a>
      </div>
    </div>
  );
}
