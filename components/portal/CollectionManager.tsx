'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Collection } from '@/lib/portal';

type Row = Record<string, unknown> & { id: string; created_at?: string };

const stageColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-900',
  pledged: 'bg-blue-100 text-blue-900',
  prospect: 'bg-blue-100 text-blue-900',
  interest: 'bg-blue-100 text-blue-900',
  research: 'bg-blue-100 text-blue-900',
  invited: 'bg-blue-100 text-blue-900',
  in_progress: 'bg-amber-100 text-amber-900',
  reviewing: 'bg-amber-100 text-amber-900',
  conversation: 'bg-amber-100 text-amber-900',
  exploration: 'bg-amber-100 text-amber-900',
  drafting: 'bg-amber-100 text-amber-900',
  submitted: 'bg-purple-100 text-purple-900',
  mou: 'bg-purple-100 text-purple-900',
  onboarding: 'bg-purple-100 text-purple-900',
  reporting: 'bg-purple-100 text-purple-900',
  resolved: 'bg-emerald-100 text-emerald-900',
  approved: 'bg-emerald-100 text-emerald-900',
  received: 'bg-emerald-100 text-emerald-900',
  recurring: 'bg-emerald-100 text-emerald-900',
  active: 'bg-emerald-100 text-emerald-900',
  awarded: 'bg-emerald-100 text-emerald-900',
  signed: 'bg-emerald-100 text-emerald-900',
  declined: 'bg-red-100 text-red-900',
  cancelled: 'bg-red-100 text-red-900',
  refunded: 'bg-red-100 text-red-900',
  dormant: 'bg-stone-200 text-stone-700',
  inactive: 'bg-stone-200 text-stone-700',
  closed: 'bg-stone-200 text-stone-700',
  expired: 'bg-stone-200 text-stone-700',
  terminated: 'bg-red-100 text-red-900',
};

export default function CollectionManager({
  config,
  extra,
}: {
  config: Collection;
  extra?: React.ReactNode;
}) {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(config.table)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (!error) setRows((data as Row[]) ?? []);
    else setError(error.message);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.table]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, value: string) => {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [config.statusKey]: value } : row)));
    await supabase.from(config.table).update({ [config.statusKey]: value }).eq('id', id);
  };

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const record: Record<string, unknown> = {};
    for (const f of config.fields) {
      const v = String(fd.get(f.key) ?? '').trim();
      if (v === '') continue;
      record[f.key] = f.type === 'number' ? Number(v) : v;
    }
    const { error } = await supabase.from(config.table).insert(record);
    if (error) setError(error.message);
    else {
      setShowForm(false);
      await load();
    }
    setSaving(false);
  };

  const visible = filter === 'all' ? rows : rows.filter((r) => r[config.statusKey] === filter);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">{config.title}</h1>
          <p className="mt-1 font-body text-sm text-ink/60">{config.description}</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-gold !px-5 !py-2.5 text-xs">
          {showForm ? 'Close' : `+ New ${config.singular}`}
        </button>
      </div>

      {/* Stage summary */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 font-body text-xs font-semibold ${
            filter === 'all' ? 'bg-navy text-ivory' : 'bg-white text-ink/70 border border-navy/10'
          }`}
        >
          All ({rows.length})
        </button>
        {config.statuses.map((s) => {
          const count = rows.filter((r) => r[config.statusKey] === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 font-body text-xs font-semibold capitalize ${
                filter === s ? 'bg-navy text-ivory' : `${stageColors[s] ?? 'bg-white border border-navy/10 text-ink/70'}`
              }`}
            >
              {s.replace('_', ' ')} ({count})
            </button>
          );
        })}
      </div>

      {extra}

      {showForm && (
        <form onSubmit={create} className="portal-card mt-6 grid gap-4 md:grid-cols-2">
          {config.fields.map((f) => (
            <div key={f.key} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="label text-navy/70" htmlFor={`f-${f.key}`}>
                {f.label}
              </label>
              {f.type === 'textarea' ? (
                <textarea id={`f-${f.key}`} name={f.key} rows={3} className="field resize-none" required={f.required} />
              ) : f.type === 'select' ? (
                <select id={`f-${f.key}`} name={f.key} className="field" defaultValue={f.options?.[0]}>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`f-${f.key}`}
                  name={f.key}
                  type={f.type}
                  step={f.type === 'number' ? 'any' : undefined}
                  className="field"
                  required={f.required}
                />
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="btn-gold !px-6 !py-2.5 text-xs disabled:opacity-60">
              Save {config.singular}
            </button>
            {error && <span className="ml-4 font-body text-sm text-red-600">{error}</span>}
          </div>
        </form>
      )}

      {/* Table */}
      <div className="portal-card mt-6 overflow-x-auto !p-0">
        {loading ? (
          <p className="p-6 font-body text-sm text-ink/50">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="p-6 font-body text-sm text-ink/50">Nothing here yet.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-navy/10">
                {config.listColumns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-body text-[11px] font-bold uppercase tracking-widest text-ink/50">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-body text-[11px] font-bold uppercase tracking-widest text-ink/50">
                  Status
                </th>
                <th className="px-4 py-3 font-body text-[11px] font-bold uppercase tracking-widest text-ink/50">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-navy/5 align-top hover:bg-sand/40">
                  {config.listColumns.map((c) => (
                    <td key={c.key} className="max-w-[260px] px-4 py-3 font-body text-sm text-ink/85">
                      <span className="line-clamp-2">
                        {c.key === 'amount' || c.key === 'amount_requested'
                          ? row[c.key] != null
                            ? `$${Number(row[c.key]).toLocaleString()}`
                            : '—'
                          : String(row[c.key] ?? '—')}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <select
                      value={String(row[config.statusKey] ?? '')}
                      onChange={(e) => updateStatus(row.id, e.target.value)}
                      className={`cursor-pointer border-0 px-2 py-1 font-body text-xs font-semibold capitalize ${
                        stageColors[String(row[config.statusKey])] ?? 'bg-stone-100'
                      }`}
                    >
                      {config.statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-body text-xs text-ink/50">
                    {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
