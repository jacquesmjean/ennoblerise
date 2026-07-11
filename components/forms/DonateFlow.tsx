'use client';

import { useState, useTransition } from 'react';
import { submitPledge } from '@/app/actions';
import type { Dict, Locale } from '@/lib/i18n';

const AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function DonateFlow({ dict, locale }: { dict: Dict; locale: Locale }) {
  const d = dict.donate;
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState('');
  const [designation, setDesignation] = useState('greatest');
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const effective = custom ? Number(custom) : amount;
  const hint = d.impactHints[String(amount) as keyof typeof d.impactHints];

  if (done) {
    return (
      <div className="border border-gold/50 bg-navy p-10 text-center">
        <p className="font-display text-2xl font-semibold text-gold-bright">{d.pledgeReceivedTitle}</p>
        <p className="mx-auto mt-4 max-w-md font-body leading-relaxed text-ivory/80">
          {d.pledgeReceivedBody}
        </p>
      </div>
    );
  }

  return (
    <form
      className="border border-ivory/15 bg-white/5 p-7 backdrop-blur-sm md:p-9"
      action={(fd) => {
        fd.set('locale', locale);
        fd.set('frequency', frequency);
        fd.set('designation', designation);
        fd.set('amount', String(effective));
        startTransition(async () => {
          const res = await submitPledge(fd);
          if (res.ok) setDone(true);
        });
      }}
    >
      {/* Frequency */}
      <div className="grid grid-cols-2 gap-2">
        {(['once', 'monthly'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            className={`px-4 py-3 font-body text-sm font-semibold transition-colors ${
              frequency === f
                ? 'bg-gold text-navy'
                : 'border border-ivory/25 text-ivory/75 hover:border-gold/60'
            }`}
          >
            {f === 'once' ? d.frequencyOnce : d.frequencyMonthly}
          </button>
        ))}
      </div>

      {/* Amounts */}
      <p className="label mt-8 text-gold-bright">{d.amountLabel}</p>
      <div className="grid grid-cols-3 gap-2">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setAmount(a);
              setCustom('');
            }}
            className={`relative px-3 py-3.5 font-display text-lg transition-colors ${
              amount === a && !custom
                ? 'bg-gold text-navy'
                : 'border border-ivory/25 text-ivory/85 hover:border-gold/60'
            }`}
          >
            ${a.toLocaleString()}
            {frequency === 'monthly' && (
              <span className="block font-body text-[9px] uppercase tracking-widest opacity-70">
                {d.monthlyBadge}
              </span>
            )}
          </button>
        ))}
      </div>
      <input
        type="number"
        min={1}
        placeholder={d.customAmount}
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        className="field-dark mt-2"
        aria-label={d.customAmount}
      />
      {hint && !custom && (
        <p className="mt-3 font-body text-sm italic leading-relaxed text-gold-pale/90">✦ {hint}</p>
      )}

      {/* Designation */}
      <p className="label mt-8 text-gold-bright">{d.designationLabel}</p>
      <div className="space-y-2">
        {d.designations.map((des) => (
          <button
            key={des.id}
            type="button"
            onClick={() => setDesignation(des.id)}
            className={`block w-full px-4 py-3 text-left font-body text-sm transition-colors ${
              designation === des.id
                ? 'border border-gold bg-gold/15 text-gold-pale'
                : 'border border-ivory/20 text-ivory/75 hover:border-gold/50'
            }`}
          >
            {des.label}
          </button>
        ))}
      </div>

      {/* Donor details */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label text-gold-bright" htmlFor="donor-name">{d.nameLabel}</label>
          <input id="donor-name" name="name" required className="field-dark" />
        </div>
        <div>
          <label className="label text-gold-bright" htmlFor="donor-email">{d.emailLabel}</label>
          <input id="donor-email" name="email" type="email" required className="field-dark" />
        </div>
      </div>
      <div className="mt-4">
        <label className="label text-gold-bright" htmlFor="dedication">{d.dedicationLabel}</label>
        <input id="dedication" name="dedication" placeholder={d.dedicationPlaceholder} className="field-dark" />
      </div>
      <div className="mt-4">
        <label className="label text-gold-bright" htmlFor="donor-note">{d.noteLabel}</label>
        <textarea id="donor-note" name="note" rows={2} className="field-dark resize-none" />
      </div>

      <button type="submit" disabled={pending || !effective} className="btn-gold mt-8 w-full disabled:opacity-60">
        {d.continue} — ${Number(effective || 0).toLocaleString()}
        {frequency === 'monthly' ? ` / ${d.monthlyBadge}` : ''}
      </button>
      <p className="mt-5 font-body text-[11px] leading-relaxed text-ivory/50">{d.trust}</p>
    </form>
  );
}
