'use client';

import { useState, useTransition } from 'react';
import { submitScholarshipApplication } from '@/app/actions';
import type { Locale } from '@/lib/i18n';
import type { ScholarshipContent } from '@/lib/scholarshipData';

export default function ScholarshipForm({
  content,
  locale,
}: {
  content: ScholarshipContent;
  locale: Locale;
}) {
  const f = content.form;
  const [path, setPath] = useState(f.paths[3]);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div className="border border-gold/60 bg-white p-12 text-center">
        <p className="font-display text-2xl font-semibold text-navy">{f.receivedTitle}</p>
        <p className="mx-auto mt-4 max-w-lg font-body leading-relaxed text-ink/75">{f.receivedBody}</p>
      </div>
    );
  }

  return (
    <form
      id="apply"
      className="scroll-mt-28 border border-navy/15 bg-white p-7 md:p-10"
      action={(fd) => {
        fd.set('locale', locale);
        fd.set('education_path', path);
        startTransition(async () => {
          const res = await submitScholarshipApplication(fd);
          if (res.ok) setDone(true);
        });
      }}
    >
      <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">{content.applyTitle}</h2>
      <p className="mt-3 font-body text-[15px] leading-relaxed text-ink/70">{content.applyIntro}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label text-navy/70" htmlFor="s-name">{f.name} *</label>
          <input id="s-name" name="name" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="s-email">{f.email} *</label>
          <input id="s-email" name="email" type="email" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="s-phone">{f.phone}</label>
          <input id="s-phone" name="phone" className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="s-country">{f.country} *</label>
          <input id="s-country" name="country" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="s-institution">{f.institution} *</label>
          <input id="s-institution" name="institution" required className="field" />
        </div>
        <div>
          <label className="label text-navy/70" htmlFor="s-program">{f.program}</label>
          <input id="s-program" name="program" className="field" />
        </div>
      </div>

      <p className="label mt-7 text-navy/70">{f.path}</p>
      <div className="flex flex-wrap gap-2">
        {f.paths.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPath(p)}
            className={`px-3.5 py-2 font-body text-[13px] transition-colors ${
              path === p
                ? 'border border-gold bg-gold/10 font-semibold text-navy'
                : 'border border-navy/15 text-ink/70 hover:border-gold/60'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {[
        { key: 'career_vision', label: f.careerVision, hint: f.careerVisionHint, rows: 4, required: true },
        { key: 'service', label: f.service, hint: f.serviceHint, rows: 4, required: true },
        { key: 'essay', label: f.essay, hint: f.essayHint, rows: 10, required: true },
        { key: 'financial_need', label: f.need, hint: f.needHint, rows: 3, required: false },
      ].map((t) => (
        <div key={t.key} className="mt-7">
          <label className="label text-navy/70" htmlFor={`s-${t.key}`}>
            {t.label}
            {t.required ? ' *' : ''}
          </label>
          <p className="mb-2 font-body text-[13px] italic leading-relaxed text-ink/55">{t.hint}</p>
          <textarea id={`s-${t.key}`} name={t.key} rows={t.rows} required={t.required} className="field resize-y" />
        </div>
      ))}

      <div className="mt-8 border-l-2 border-gold bg-sand/60 p-5">
        <p className="font-body text-sm font-semibold text-navy">{f.commitment}</p>
        <ul className="mt-3 space-y-1.5">
          {f.commitmentItems.map((c) => (
            <li key={c} className="flex gap-2 font-body text-[13.5px] text-ink/75">
              <span className="text-gold">—</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" disabled={pending} className="btn-gold mt-8 w-full disabled:opacity-60">
        {f.submit}
      </button>
    </form>
  );
}
