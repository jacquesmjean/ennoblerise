import type { Metadata } from 'next';
import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import { scholarshipData } from '@/lib/scholarshipData';
import ScholarshipForm from '@/components/forms/ScholarshipForm';
import Reveal from '@/components/Reveal';
import SunriseArc from '@/components/SunriseArc';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = scholarshipData[(locale as Locale) in scholarshipData ? (locale as Locale) : 'en'];
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/${locale}/scholarship` },
  };
}

export default async function ScholarshipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = (l as Locale) in scholarshipData ? (l as Locale) : 'en';
  const c = scholarshipData[locale];
  getDict(locale); // ensure dict bundle

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Grant',
    name: 'Michael G. Henry Legacy Scholarship™',
    description: c.metaDescription,
    funder: { '@type': 'NGO', name: 'EnnobleRise Global Trust' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="horizon-strong relative pt-40 pb-24 text-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{c.kicker}</p>
          <h1
            className="mt-6 max-w-4xl animate-rise font-display text-4xl font-medium leading-tight md:text-6xl md:leading-[1.1]"
            style={{ animationDelay: '150ms' }}
          >
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl animate-rise font-body text-lg leading-relaxed text-ivory/85" style={{ animationDelay: '300ms' }}>
            {c.sub}
          </p>
          <p className="mt-8 animate-rise font-display text-lg italic text-gold-bright" style={{ animationDelay: '420ms' }}>
            “{c.motto}”
          </p>
        </div>
      </section>

      {/* Legacy */}
      <section className="grain bg-ivory py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <p className="kicker text-gold">{c.legacyKicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-navy md:text-4xl">{c.legacyTitle}</h2>
            <SunriseArc className="mt-8 h-12 w-40" />
            <div className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-body text-sm font-semibold uppercase tracking-widest text-navy/60">
                Michael G. Henry
              </p>
              <p className="mt-1 font-body text-sm italic text-ink/60">
                Educator · Minister · Broadcaster · Mentor · Humanitarian
              </p>
            </div>
          </Reveal>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            {c.legacyBody.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={`leading-[1.85] ${i === 1 ? 'font-display text-xl italic text-navy' : 'font-body text-lg text-ink/85'}`}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy + eligibility + criteria */}
      <section className="horizon py-24 text-ivory md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-3 md:px-8">
          <Reveal>
            <div className="border-t border-gold/50 pt-7">
              <h2 className="font-display text-xl font-semibold text-gold-bright">{c.philosophyTitle}</h2>
              <p className="mt-4 font-body text-sm text-ivory/70">{c.philosophyIntro}</p>
              <ul className="mt-4 space-y-2.5">
                {c.philosophyItems.map((item, i) => (
                  <li key={item} className="flex gap-3 font-display text-lg text-ivory/95">
                    <span className="font-body text-xs text-gold-bright pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-t border-gold/50 pt-7">
              <h2 className="font-display text-xl font-semibold text-gold-bright">{c.eligibilityTitle}</h2>
              <ul className="mt-5 space-y-4">
                {c.eligibilityItems.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[15px] leading-relaxed text-ivory/85">
                    <span className="text-gold-bright">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="border-t border-gold/50 pt-7">
              <h2 className="font-display text-xl font-semibold text-gold-bright">{c.criteriaTitle}</h2>
              <p className="mt-4 font-body text-sm text-ivory/70">{c.criteriaNote}</p>
              <div className="mt-5 space-y-3">
                {c.criteria.map((cr) => (
                  <div key={cr.name}>
                    <div className="flex items-baseline justify-between font-body text-sm">
                      <span className="text-ivory/90">{cr.name}</span>
                      <span className="font-semibold text-gold-bright">{cr.weight}</span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/10">
                      <div className="h-1 bg-gold-bright/80" style={{ width: cr.weight }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application */}
      <section className="grain bg-sand py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{c.promiseTitle}</h2>
              <p className="mt-5 font-body leading-[1.8] text-ink/80">{c.promiseBody}</p>
              <p className="mt-8 font-display text-xl italic text-navy">{c.promiseClose1}</p>
              <p className="font-display text-xl italic text-gold">{c.promiseClose2}</p>
              <div className="mt-10 hidden md:block">
                <Link href="#apply" className="btn-ghost-dark">
                  {c.form.submit} ↓
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={120}>
              <ScholarshipForm content={c} locale={locale} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
