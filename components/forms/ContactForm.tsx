'use client';

import { useState, useTransition } from 'react';
import { submitInquiry } from '@/lib/submit';
import type { Dict, Locale } from '@/lib/i18n';

export default function ContactForm({ dict, locale }: { dict: Dict; locale: Locale }) {
  const c = dict.contact;
  const [topic, setTopic] = useState('programs');
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="border border-gold/60 bg-white p-10 text-center">
        <p className="font-display text-2xl font-semibold text-navy">{c.receivedTitle}</p>
        <p className="mx-auto mt-4 max-w-md font-body leading-relaxed text-ink/75">{c.receivedBody}</p>
      </div>
    );
  }

  return (
    <form
      className="border border-navy/15 bg-white p-7 md:p-9"
      action={(fd) => {
        fd.set('locale', locale);
        fd.set('topic', topic);
        fd.set('source', 'contact');
        startTransition(async () => {
          const res = await submitInquiry(fd);
          if (res.ok) setDone(true);
        });
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label text-navy/70" htmlFor="ct-name">{c.nameLabel}</label>
          <input id="ct-name" name="name" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="ct-email">{c.emailLabel}</label>
          <input id="ct-email" name="email" type="email" required className="field" />
        </div>
      </div>

      <p className="label mt-6 text-navy/70">{c.topicLabel}</p>
      <div className="flex flex-wrap gap-2">
        {c.topics.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTopic(t.id)}
            className={`px-3.5 py-2 font-body text-[13px] transition-colors ${
              topic === t.id
                ? 'border border-gold bg-gold/10 font-semibold text-navy'
                : 'border border-navy/15 text-ink/70 hover:border-gold/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="label text-navy/70" htmlFor="ct-message">{c.messageLabel}</label>
        <textarea id="ct-message" name="message" rows={6} required className="field resize-none" />
      </div>

      <button type="submit" disabled={pending} className="btn-gold mt-7 w-full disabled:opacity-60">
        {c.submit}
      </button>
    </form>
  );
}
