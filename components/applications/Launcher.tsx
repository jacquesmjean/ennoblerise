'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type Stat = { raised: number; grants: number; onboarding: number; newInquiries: number; scholarships: number };

const apps = [
  { href: '/applications/finance', name: 'Financial Dashboard', desc: 'Giving, grants, income & expense at a glance.', icon: '📊', accent: 'border-t-teal' },
  { href: '/applications/grants', name: 'Grant Writing', desc: 'Compose LOIs & full proposals; track the pipeline.', icon: '✦', accent: 'border-t-gold-bright' },
  { href: '/applications/contracts', name: 'Contract Management', desc: 'NDAs, partnerships, third-party & scholarship agreements.', icon: '§', accent: 'border-t-navy' },
  { href: '/applications/donations', name: 'Donations', desc: 'Gifts, pledges & recurring donors.', icon: '♥', accent: 'border-t-coral' },
  { href: '/applications/scholarships', name: 'Scholarships', desc: 'Michael G. Henry Legacy Scholarship applications.', icon: '🎓', accent: 'border-t-gold-bright' },
  { href: '/applications/partners', name: 'Partners & Countries', desc: 'Institutional partners & country-chapter onboarding.', icon: '⚑', accent: 'border-t-sky' },
  { href: '/applications/onboarding', name: 'Employee Onboarding', desc: 'Employees, contractors & ambassadors, offer to active.', icon: '⚭', accent: 'border-t-leaf' },
  { href: '/applications/inquiries', name: 'Front Desk', desc: 'Contact & concierge messages to triage.', icon: '☎', accent: 'border-t-navy' },
  { href: '/applications/applications', name: 'Join Applications', desc: 'Volunteers, ambassadors & partner requests.', icon: '✍', accent: 'border-t-coral' },
  { href: '/applications/ledger', name: 'Ledger', desc: 'Record income & expense entries.', icon: '⛁', accent: 'border-t-teal' },
  { href: '/applications/staff', name: 'Staff', desc: 'Team accounts & roles.', icon: '◇', accent: 'border-t-navy' },
];

export default function Launcher() {
  const supabase = createClient();
  const [stat, setStat] = useState<Stat | null>(null);

  useEffect(() => {
    (async () => {
      const count = async (table: string, filter?: [string, string]) => {
        let q = supabase.from(table).select('*', { count: 'exact', head: true });
        if (filter) q = q.eq(filter[0], filter[1]);
        const { count: c } = await q;
        return c ?? 0;
      };
      const { data: donations } = await supabase.from('donations').select('amount');
      const raised = (donations ?? []).reduce((s, d) => s + Number(d.amount || 0), 0);
      setStat({
        raised,
        grants: await count('grants'),
        onboarding: await count('employee_onboarding'),
        newInquiries: await count('inquiries', ['status', 'new']),
        scholarships: await count('scholarship_applications', ['status', 'new']),
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy md:text-4xl">EnnobleRise Applications</h1>
      <p className="mt-1 font-body text-sm text-ink/60">
        Your operations suite — every tool that runs the Trust, in one secure place.
      </p>

      {/* Live stat strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'Raised to date', value: stat ? `$${stat.raised.toLocaleString()}` : '—' },
          { label: 'Grants in pipeline', value: stat ? stat.grants : '—' },
          { label: 'New front-desk', value: stat ? stat.newInquiries : '—' },
          { label: 'Scholarship apps', value: stat ? stat.scholarships : '—' },
        ].map((s) => (
          <div key={s.label} className="border border-navy/10 bg-white px-4 py-3">
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-ink/45">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy">{s.value}</p>
          </div>
        ))}
      </div>

      {/* App grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`portal-card group block border-t-4 ${a.accent} transition-shadow hover:shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none">{a.icon}</span>
              <div>
                <h2 className="font-display text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                  {a.name}
                </h2>
                <p className="mt-1 font-body text-[13px] leading-relaxed text-ink/60">{a.desc}</p>
              </div>
            </div>
            <span className="mt-4 inline-block font-body text-xs font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
