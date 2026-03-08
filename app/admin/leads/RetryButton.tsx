'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RetryButton({ id, disabled }: { id: string; disabled: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRetry = async () => {
    if (disabled || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads/retry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'retry_failed');
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
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onRetry}
        disabled={disabled || loading}
        className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-50"
      >
        {loading ? 'Retrying…' : 'Retry'}
      </button>
      {error ? <div className="text-[10px] text-rose-300">Error: {error}</div> : null}
    </div>
  );
}

