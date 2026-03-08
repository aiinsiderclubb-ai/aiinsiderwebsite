'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function NotesEditor({ id, initialNotes }: { id: string; initialNotes: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialNotes || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    const s = (initialNotes || '').trim();
    if (!s) return '—';
    return s.length > 60 ? `${s.slice(0, 60)}…` : s;
  }, [initialNotes]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads/update', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, notes: value }),
      });
      const data = (await res.json().catch(() => null)) as any;
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'save_failed');
        return;
      }
      setOpen(false);
      router.refresh();
    } catch {
      setError('network_error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs text-white/80">{preview}</div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-white/10"
      >
        Edit
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-white">Internal notes</div>
                <div className="text-xs text-white/50">Visible only in admin.</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={8}
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
              placeholder="Add context, objections, next step, etc."
            />

            {error ? <div className="mt-2 text-xs text-rose-300">Error: {error}</div> : null}

            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-gray-100 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

