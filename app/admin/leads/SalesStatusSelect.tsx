'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SALES_STATUSES = ['new', 'contacted', 'qualified', 'booked', 'won', 'lost'] as const;

export default function SalesStatusSelect({
  id,
  value,
}: {
  id: string;
  value: (typeof SALES_STATUSES)[number];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = async (next: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads/update', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, salesStatus: next }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'update_failed');
        return;
      }
      router.refresh();
    } catch {
      setError('network_error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <select
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-xs text-white disabled:opacity-60"
      >
        {SALES_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {error ? <div className="text-[10px] text-rose-300">Error: {error}</div> : null}
    </div>
  );
}

