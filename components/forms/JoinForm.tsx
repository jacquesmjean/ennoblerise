'use client';

import { useState, useTransition } from 'react';
import { submitJoinApplication } from '@/app/actions';
import type { Dict, Locale } from '@/lib/i18n';

export default function JoinForm({
  dict,
  locale,
  initialRole = 'volunteer',
}: {
  dict: Dict;
  locale: Locale;
  initialRole?: string;
}) {
  const j = dict.join;
  const [role, setRole] = useState(initialRole);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="border border-gold/60 bg-white p-10 text-center">
        <p className="font-display text-2xl font-semibold text-navy">{j.receivedTitle}</p>
        <p className="mx-auto mt-4 max-w-md font-body leading-relaxed text-ink/75">{j.receivedBody}</p>
      </div>
    );
  }

  return (
    <form
      id="apply"
      className="scroll-mt-28 border border-navy/15 bg-white p-7 md:p-9"
      action={(fd) => {
        fd.set('locale', locale);
        fd.set('role', role);
        startTransition(async () => {
          const res = await submitJoinApplication(fd);
          if (res.ok) setDone(true);
        });
      }}
    >
      <h2 className="font-display text-2xl font-semibold text-navy">{j.formTitle}</h2>

      <p className="label mt-7 text-navy/70">{j.roleLabel}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {j.roles.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={`px-4 py-3 text-left font-body text-sm transition-colors ${
              role === r.id
                ? 'border border-gold bg-gold/10 font-semibold text-navy'
                : 'border border-navy/15 text-ink/70 hover:border-gold/60'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label text-navy/70" htmlFor="join-name">{dict.contact.nameLabel}</label>
          <input id="join-name" name="name" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="join-email">{dict.contact.emailLabel}</label>
          <input id="join-email" name="email" type="email" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="join-country">{j.countryLabel}</label>
          <input id="join-country" name="country" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="join-org">{j.orgLabel}</label>
          <input id="join-org" name="organization" className="field" />
        </div>
      </div>
      <div className="mt-4">
        <label className="label text-navy/70" htmlFor="join-message">{j.messageLabel}</label>
        <textarea
          id="join-message"
          name="message"
          rows={5}
          required
          placeholder={j.messagePlaceholder}
          className="field resize-none"
        />
      </div>

      <button type="submit" disabled={pending} className="btn-gold mt-7 w-full disabled:opacity-60">
        {j.submit}
      </button>
    </form>
  );
}
