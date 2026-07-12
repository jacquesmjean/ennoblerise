'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type Donation = { amount: number; status: string; designation: string; frequency: string; created_at: string };
type Grant = { amount_requested: number | null; amount_awarded: number | null; stage: string; program: string };
type Ledger = { type: string; amount: number; program: string; category: string; description: string; entry_date: string };

const PROGRAMS = [
  { key: 'youth', label: 'Youth', color: '#38BDF8' },
  { key: 'educators', label: 'Educators', color: '#00A29E' },
  { key: 'women', label: 'Women', color: '#F88379' },
  { key: 'scholarship', label: 'Scholarship', color: '#FBBF24' },
  { key: 'general', label: 'General / where needed', color: '#1E3A8A' },
];

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export default function FinanceDashboard() {
  const supabase = createClient();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [d, g, l] = await Promise.all([
        supabase.from('donations').select('amount,status,designation,frequency,created_at'),
        supabase.from('grants').select('amount_requested,amount_awarded,stage,program'),
        supabase.from('ledger').select('type,amount,program,category,description,entry_date'),
      ]);
      setDonations((d.data as Donation[]) ?? []);
      setGrants((g.data as Grant[]) ?? []);
      setLedger((l.data as Ledger[]) ?? []);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const m = useMemo(() => {
    const received = donations
      .filter((d) => d.status === 'received' || d.status === 'recurring')
      .reduce((s, d) => s + Number(d.amount || 0), 0);
    const pledged = donations
      .filter((d) => d.status === 'pledged')
      .reduce((s, d) => s + Number(d.amount || 0), 0);
    const grantsAwarded = grants.reduce((s, g) => s + Number(g.amount_awarded || 0), 0);
    const grantPipeline = grants
      .filter((g) => ['research', 'drafting', 'submitted'].includes(g.stage))
      .reduce((s, g) => s + Number(g.amount_requested || 0), 0);
    const ledgerIncome = ledger.filter((e) => e.type === 'income').reduce((s, e) => s + Number(e.amount || 0), 0);
    const expenses = ledger.filter((e) => e.type === 'expense').reduce((s, e) => s + Number(e.amount || 0), 0);

    const totalIncome = received + grantsAwarded + ledgerIncome;
    const net = totalIncome - expenses;

    // Allocation by program (received donations by designation + ledger income by program)
    const alloc: Record<string, number> = {};
    for (const d of donations.filter((x) => x.status === 'received' || x.status === 'recurring')) {
      const k = d.designation === 'greatest' ? 'general' : d.designation;
      alloc[k] = (alloc[k] || 0) + Number(d.amount || 0);
    }
    for (const e of ledger.filter((x) => x.type === 'income')) {
      alloc[e.program] = (alloc[e.program] || 0) + Number(e.amount || 0);
    }
    for (const g of grants) {
      if (g.amount_awarded) alloc[g.program] = (alloc[g.program] || 0) + Number(g.amount_awarded);
    }
    const allocTotal = Object.values(alloc).reduce((s, v) => s + v, 0) || 1;

    // Monthly income trend (last 6 months)
    const now = new Date();
    const months: { label: string; income: number; expense: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      const label = dt.toLocaleDateString('en-US', { month: 'short' });
      let inc = 0;
      let exp = 0;
      for (const d of donations) {
        if ((d.status === 'received' || d.status === 'recurring') && (d.created_at || '').startsWith(key)) inc += Number(d.amount || 0);
      }
      for (const e of ledger) {
        if ((e.entry_date || '').startsWith(key)) {
          if (e.type === 'income') inc += Number(e.amount || 0);
          else exp += Number(e.amount || 0);
        }
      }
      months.push({ label, income: inc, expense: exp });
    }
    const monthMax = Math.max(1, ...months.map((x) => Math.max(x.income, x.expense)));

    return { received, pledged, grantsAwarded, grantPipeline, ledgerIncome, expenses, totalIncome, net, alloc, allocTotal, months, monthMax };
  }, [donations, grants, ledger]);

  const kpis = [
    { label: 'Total income', value: money(m.totalIncome), hint: 'Received gifts + grants awarded + logged income', big: true },
    { label: 'Expenses', value: money(m.expenses), hint: 'Logged expense entries' },
    { label: 'Net position', value: money(m.net), hint: 'Income minus expenses' },
    { label: 'Pledged (not yet received)', value: money(m.pledged), hint: 'Donation pledges awaiting payment' },
    { label: 'Grant pipeline value', value: money(m.grantPipeline), hint: 'Requested across research → submitted' },
    { label: 'Grants awarded', value: money(m.grantsAwarded), hint: 'Total awarded to date' },
  ];

  if (loading) {
    return (
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Financial Dashboard</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="portal-card h-28 animate-pulse bg-white/60" />
          ))}
        </div>
      </div>
    );
  }

  const empty = m.totalIncome === 0 && m.expenses === 0 && m.pledged === 0 && m.grantPipeline === 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy md:text-4xl">Financial Dashboard</h1>
          <p className="mt-1 font-body text-sm text-ink/60">
            A live view of giving, grants, and operating finances across the three pillars.
          </p>
        </div>
        <Link href="/applications/ledger" className="btn-gold !px-5 !py-2.5 text-xs">+ Add ledger entry</Link>
      </div>

      {empty && (
        <div className="mt-6 border border-dashed border-navy/25 bg-white p-6">
          <p className="font-body text-sm text-ink/60">
            No financial data yet. As donations come in and you log income/expense entries in the{' '}
            <Link href="/applications/ledger" className="font-semibold text-gold underline">Ledger</Link>, this
            dashboard fills in automatically — totals, allocation by pillar, and the monthly trend.
          </p>
        </div>
      )}

      {/* KPI tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className={`portal-card ${k.big ? 'border-l-4 !border-l-teal' : ''}`}>
            <p className="font-body text-[11px] font-bold uppercase tracking-widest text-ink/45">{k.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy">{k.value}</p>
            <p className="mt-2 font-body text-xs text-ink/50">{k.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Allocation by pillar */}
        <div className="portal-card">
          <h2 className="font-display text-lg font-semibold text-navy">Allocation by pillar</h2>
          <p className="mt-1 font-body text-xs text-ink/50">Where received funds are directed.</p>
          <div className="mt-5 space-y-4">
            {PROGRAMS.map((p) => {
              const val = m.alloc[p.key] || 0;
              const pct = Math.round((val / m.allocTotal) * 100);
              return (
                <div key={p.key}>
                  <div className="flex items-baseline justify-between font-body text-sm">
                    <span className="text-ink/80">{p.label}</span>
                    <span className="font-semibold text-navy">{money(val)} <span className="text-ink/40">· {pct}%</span></span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full bg-sand">
                    <div className="h-2.5" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly trend */}
        <div className="portal-card">
          <h2 className="font-display text-lg font-semibold text-navy">Last 6 months</h2>
          <p className="mt-1 font-body text-xs text-ink/50">
            <span className="text-teal">■</span> income&nbsp;&nbsp;<span className="text-coral">■</span> expense
          </p>
          <div className="mt-5 flex h-40 items-end justify-between gap-3">
            {m.months.map((mo) => (
              <div key={mo.label} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-32 w-full items-end justify-center gap-1">
                  <div
                    className="w-1/2 bg-teal"
                    style={{ height: `${(mo.income / m.monthMax) * 100}%` }}
                    title={`Income ${money(mo.income)}`}
                  />
                  <div
                    className="w-1/2 bg-coral"
                    style={{ height: `${(mo.expense / m.monthMax) * 100}%` }}
                    title={`Expense ${money(mo.expense)}`}
                  />
                </div>
                <span className="font-body text-[11px] text-ink/50">{mo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent ledger */}
      <div className="portal-card mt-6 overflow-x-auto !p-0">
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="font-display text-lg font-semibold text-navy">Recent ledger entries</h2>
          <Link href="/applications/ledger" className="font-body text-xs font-semibold text-gold">View all →</Link>
        </div>
        {ledger.length === 0 ? (
          <p className="p-6 font-body text-sm text-ink/50">No entries yet.</p>
        ) : (
          <table className="mt-3 w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-navy/10">
                {['Date', 'Category', 'Description', 'Program', 'Amount'].map((h) => (
                  <th key={h} className="px-6 py-2.5 font-body text-[11px] font-bold uppercase tracking-widest text-ink/45">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...ledger]
                .sort((a, b) => (b.entry_date || '').localeCompare(a.entry_date || ''))
                .slice(0, 8)
                .map((e, i) => (
                  <tr key={i} className="border-b border-navy/5">
                    <td className="px-6 py-2.5 font-body text-sm text-ink/70">{e.entry_date}</td>
                    <td className="px-6 py-2.5 font-body text-sm text-ink/80">{e.category}</td>
                    <td className="px-6 py-2.5 font-body text-sm text-ink/70">{e.description}</td>
                    <td className="px-6 py-2.5 font-body text-sm capitalize text-ink/70">{e.program}</td>
                    <td className={`px-6 py-2.5 font-body text-sm font-semibold ${e.type === 'income' ? 'text-emerald-700' : 'text-orange-700'}`}>
                      {e.type === 'income' ? '+' : '−'}{money(Number(e.amount || 0))}
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
