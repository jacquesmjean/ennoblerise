'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Row = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  worker_type: string;
  start_date: string | null;
  country: string;
  stage: string;
  offer_signed: boolean;
  nda_signed: boolean;
  accounts_provisioned: boolean;
  equipment_ready: boolean;
  orientation_done: boolean;
  notes: string;
  created_at: string;
};

const STAGES = ['offer', 'paperwork', 'provisioning', 'orientation', 'active', 'offboarded'];
const CHECKS: { key: keyof Row; label: string }[] = [
  { key: 'offer_signed', label: 'Offer signed' },
  { key: 'nda_signed', label: 'NDA signed' },
  { key: 'accounts_provisioned', label: 'Accounts provisioned' },
  { key: 'equipment_ready', label: 'Equipment ready' },
  { key: 'orientation_done', label: 'Orientation complete' },
];
const stageColor: Record<string, string> = {
  offer: 'bg-blue-100 text-blue-900',
  paperwork: 'bg-amber-100 text-amber-900',
  provisioning: 'bg-purple-100 text-purple-900',
  orientation: 'bg-purple-100 text-purple-900',
  active: 'bg-emerald-100 text-emerald-900',
  offboarded: 'bg-stone-200 text-stone-700',
};

export default function OnboardingManager() {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('employee_onboarding')
      .select('*')
      .order('created_at', { ascending: false });
    setRows((data as Row[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (id: string, changes: Partial<Row>) => {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, ...changes } : row)));
    await supabase.from('employee_onboarding').update(changes).eq('id', id);
  };

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const rec = {
      full_name: String(fd.get('full_name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      role: String(fd.get('role') || '').trim(),
      worker_type: String(fd.get('worker_type') || 'employee'),
      country: String(fd.get('country') || '').trim(),
      start_date: String(fd.get('start_date') || '') || null,
    };
    await supabase.from('employee_onboarding').insert(rec);
    setShowForm(false);
    setSaving(false);
    load();
  };

  const progress = (r: Row) => CHECKS.filter((c) => r[c.key]).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy md:text-4xl">Employee Onboarding</h1>
          <p className="mt-1 font-body text-sm text-ink/60">
            Bring on employees, contractors, ambassadors, and volunteers — offer through active, with a checklist for each.
          </p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-gold !px-5 !py-2.5 text-xs">
          {showForm ? 'Close' : '+ Onboard someone'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="portal-card mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label text-navy/70">Full name</label>
            <input name="full_name" required className="field" />
          </div>
          <div>
            <label className="label text-navy/70">Email</label>
            <input name="email" type="email" className="field" />
          </div>
          <div>
            <label className="label text-navy/70">Role / title</label>
            <input name="role" className="field" />
          </div>
          <div>
            <label className="label text-navy/70">Type</label>
            <select name="worker_type" className="field" defaultValue="employee">
              <option value="employee">Employee</option>
              <option value="contractor">Contractor</option>
              <option value="ambassador">Ambassador</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div>
            <label className="label text-navy/70">Country</label>
            <input name="country" className="field" />
          </div>
          <div>
            <label className="label text-navy/70">Start date</label>
            <input name="start_date" type="date" className="field" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="btn-gold !px-6 !py-2.5 text-xs disabled:opacity-60">
              Add to onboarding
            </button>
          </div>
        </form>
      )}

      {/* Cards */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="font-body text-sm text-ink/50">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="border border-dashed border-navy/25 bg-white p-6">
            <p className="font-body text-sm text-ink/60">
              No one in onboarding yet. Click <span className="font-semibold">Onboard someone</span> to start — each person
              gets a five-step checklist (offer, NDA, accounts, equipment, orientation) and moves through the stages.
            </p>
          </div>
        ) : (
          rows.map((r) => (
            <div key={r.id} className="portal-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">{r.full_name || 'Unnamed'}</h2>
                  <p className="font-body text-sm text-ink/60">
                    {[r.role, r.worker_type, r.country].filter(Boolean).join(' · ')}
                    {r.start_date ? ` · starts ${r.start_date}` : ''}
                  </p>
                  {r.email && <p className="font-body text-xs text-ink/45">{r.email}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 font-body text-xs font-semibold capitalize ${stageColor[r.stage]}`}>
                    {r.stage}
                  </span>
                  <select
                    value={r.stage}
                    onChange={(e) => patch(r.id, { stage: e.target.value })}
                    className="border border-navy/15 bg-white px-2 py-1 font-body text-xs"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s} className="capitalize">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-sand">
                    <div className="h-1.5 bg-leaf transition-all" style={{ width: `${(progress(r) / CHECKS.length) * 100}%` }} />
                  </div>
                  <span className="font-body text-xs font-semibold text-ink/60">{progress(r)}/{CHECKS.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CHECKS.map((c) => {
                    const on = Boolean(r[c.key]);
                    return (
                      <button
                        key={String(c.key)}
                        onClick={() => patch(r.id, { [c.key]: !on } as Partial<Row>)}
                        className={`flex items-center gap-1.5 border px-3 py-1.5 font-body text-[12.5px] transition-colors ${
                          on
                            ? 'border-leaf bg-leaf/10 font-semibold text-leaf'
                            : 'border-navy/15 text-ink/60 hover:border-leaf/50'
                        }`}
                      >
                        <span>{on ? '✓' : '○'}</span>
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
