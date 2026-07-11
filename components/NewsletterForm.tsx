'use client';

import { useState, useTransition } from 'react';
import { subscribeNewsletter } from '@/app/actions';
import type { Dict, Locale } from '@/lib/i18n';

export default function NewsletterForm({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return <p className="font-body text-sm text-gold-bright">{dict.footer.subscribed}</p>;
  }

  return (
    <form
      action={(fd) => {
        fd.set('locale', locale);
        startTransition(async () => {
          const res = await subscribeNewsletter(fd);
          if (res.ok) setDone(true);
        });
      }}
      className="flex gap-2"
    >
      <input
        type="email"
        name="email"
        required
        placeholder={dict.footer.emailPlaceholder}
        className="field-dark flex-1 !py-2.5 text-sm"
        aria-label={dict.footer.emailPlaceholder}
      />
      <button type="submit" disabled={pending} className="btn-gold !px-5 !py-2.5 text-xs disabled:opacity-60">
        {dict.footer.subscribe}
      </button>
    </form>
  );
}
