'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type Counts = {
  inquiries: number;
  newInquiries: number;
  applications: number;
  donationsTotal: number;
  donationsCount: number;
  grants: number;
  contracts: number;
  partners: number;
  chapters: number;
  subscribers: number;
};

const card = (label: string, value: string | number, href: string, hint?: string) => ({
  label,
  value,
  href,
  hint,
});

export default function Dashboard() {
  const supabase = createClient();
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    (async () => {
      const count = async (table: string, filter?: [string, string]) => {
        let q = supabase.from(table).select('*', { count: 'exact', head: true });
        if (filter) q = q.eq(filter[0], filter[1]);
        const { count: c } = await q;
        return c ?? 0;
      };
      const { data: donations } = await supabase.from('donations').select('amount');
      const donationsTotal = (donations ?? []).reduce((s, d) => s + Number(d.amount || 0), 0);

      setCounts({
        inquiries: await count('inquiries'),
        newInquiries: await count('inquiries', ['status', 'new']),
        applications: await count('applications', ['status', 'new']),
        donationsTotal,
        donationsCount: donations?.length ?? 0,
        grants: await count('grants'),
        contracts: await count('contracts'),
        partners: await count('partners'),
        chapters: await count('country_chapters'),
        subscribers: await count('subscribers'),
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = counts
    ? [
        card('Front desk — new', counts.newInquiries, '/portal/inquiries', `${counts.inquiries} total inquiries`),
        card('New applications', counts.applications, '/portal/applications', 'volunteers · ambassadors · partners'),
        card('Giving to date', `$${counts.donationsTotal.toLocaleString()}`, '/portal/donations', `${counts.donationsCount} gifts & pledges`),
        card('Grants in pipeline', counts.grants, '/portal/grants', 'research → reporting'),
        card('Contracts', counts.contracts, '/portal/contracts', 'NDA · partner · scholarship'),
        card('Partners', counts.partners, '/portal/partners', `${counts.chapters} country chapters`),
        card('Newsletter subscribers', counts.subscribers, '/portal/inquiries', 'letters of rise'),
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">Good day.</h1>
      <p className="mt-1 font-body text-sm text-ink/60">
        The state of the rise — across programs, giving, and partnerships.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {counts === null
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="portal-card h-32 animate-pulse bg-white/60" />
            ))
          : cards.map((c) => (
              <Link key={c.label} href={c.href} className="portal-card group block transition-shadow hover:shadow-lg">
                <p className="font-body text-[11px] font-bold uppercase tracking-widest text-ink/50">{c.label}</p>
                <p className="mt-3 font-display text-4xl font-semibold text-navy group-hover:text-gold transition-colors">
                  {c.value}
                </p>
                {c.hint && <p className="mt-2 font-body text-xs text-ink/50">{c.hint}</p>}
              </Link>
            ))}
      </div>

      <div className="portal-card mt-8">
        <h2 className="font-display text-lg font-semibold text-navy">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/portal/grants" className="btn-gold !px-5 !py-2.5 text-xs">✦ Write a grant</Link>
          <Link href="/portal/contracts" className="btn-ghost-dark !px-5 !py-2.5 text-xs">§ Generate a contract</Link>
          <Link href="/portal/partners" className="btn-ghost-dark !px-5 !py-2.5 text-xs">⚑ Onboard a country</Link>
          <Link href="/portal/staff" className="btn-ghost-dark !px-5 !py-2.5 text-xs">⚭ Manage staff</Link>
        </div>
      </div>
    </div>
  );
}
