import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import { aboutStory } from '@/lib/aboutStory';
import { advisoryBoard, ambassadors } from '@/lib/people';
import Reveal from '@/components/Reveal';
import ArcDivider from '@/components/ArcDivider';
import SunriseArc from '@/components/SunriseArc';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.about.metaTitle },
    description: dict.about.metaDescription,
    alternates: { canonical: `/${locale}/about` },
  };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. Kasthuri Henry',
  alternateName: 'Dr. Kas Henry',
  jobTitle: 'Founder & Executive Director, EnnobleRise Global Trust',
  description:
    'Transformation executive, educator, change maker, social entrepreneur, and author of the international bestseller "Ennobled for Success: From Civil War to a US CFO".',
  worksFor: { '@type': 'NGO', name: 'EnnobleRise Global Trust' },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);
  const story = aboutStory[locale];

  const categoryLabel: Record<string, string> = {
    Youth: locale === 'fr' ? 'Jeunesse' : locale === 'es' ? 'Juventud' : 'Youth',
    Educator: locale === 'fr' ? 'Éducateurs' : locale === 'es' ? 'Educadores' : 'Educators',
    Women: locale === 'fr' ? 'Femmes' : locale === 'es' ? 'Mujeres' : 'Women',
  };
  const connectLabel = locale === 'fr' ? 'Se connecter' : locale === 'es' ? 'Conectar' : 'Connect';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Page hero */}
      <section className="horizon relative pt-40 pb-32 text-ivory md:pb-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{dict.meta.tagline}</p>
          <h1 className="mt-5 animate-rise font-display text-5xl font-medium md:text-6xl" style={{ animationDelay: '150ms' }}>
            {dict.about.title}
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="grain bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <p className="kicker text-gold">{dict.philosophy.kicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-snug text-navy md:text-4xl">
              {dict.philosophy.title}
            </h2>
            <SunriseArc className="mt-8 h-12 w-40" />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={100}>
              <p className="font-body text-lg leading-[1.85] text-ink/90">{dict.philosophy.body1}</p>
              <p className="mt-6 font-body text-lg leading-[1.85] text-ink/90">{dict.philosophy.body2}</p>
              <blockquote className="mt-10 border-l-2 border-gold pl-6">
                <p className="font-display text-xl italic leading-relaxed text-navy md:text-2xl">
                  “{dict.philosophy.quote}”
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="horizon py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="kicker text-gold-bright">{dict.about.storyKicker}</p>
              <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                {dict.about.storyTitle}
              </h2>
              <div className="relative mt-10 aspect-[16/11] overflow-hidden">
                <Image
                  src="/images/kas-portrait.jpg"
                  alt="Dr. Kasthuri Henry, Founder & Executive Director of EnnobleRise Global Trust"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="mt-6 font-display text-lg italic text-gold-bright">
                “{dict.founder.mantra}”
              </p>
              <p className="mt-1 font-body text-sm text-ivory/60">— {dict.founder.title.replace('Meet ', '').replace('Rencontrez la ', '').replace('Conoce a la ', '')}</p>
            </Reveal>
            <div className="space-y-6 md:col-span-6 md:col-start-7">
              {story.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className={`font-body leading-[1.85] ${i === 0 ? 'font-display text-xl italic text-gold-pale' : 'text-ivory/85'}`}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section className="grain bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="kicker text-gold">{dict.about.ambassadorsKicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-navy md:text-4xl">
              {dict.about.ambassadorsTitle}
            </h2>
            <p className="mt-6 font-body leading-[1.8] text-ink/85">{dict.about.ambassadorsBody}</p>
          </Reveal>
          <div className="mt-16 grid gap-9 md:grid-cols-3">
            {ambassadors.map((a, i) => {
              const link = a.linkedin ?? a.website;
              return (
                <Reveal key={a.name} delay={i * 120}>
                  <article className="group relative flex h-full flex-col border-t-2 border-gold bg-white shadow-[0_2px_30px_-12px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={a.img}
                        alt={a.name}
                        fill
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/5 to-transparent" />
                      <span className="absolute left-5 top-5 border border-gold/70 bg-navy/40 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-bright backdrop-blur-sm">
                        {categoryLabel[a.category]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                      <h3 className="font-display text-2xl font-semibold text-navy">{a.name}</h3>
                      <p className="mt-2 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-gold">{a.role}</p>
                      <div className="mt-3 flex items-center gap-2.5">
                        <span className="h-px w-6 bg-gold/60" />
                        <span className="font-body text-xs uppercase tracking-[0.16em] text-ink/50">{a.country}</span>
                      </div>
                      <p className="mt-5 font-body text-[15px] leading-[1.75] text-ink/80">{a.bio}</p>
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto pt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-navy transition-colors hover:text-gold"
                        >
                          <span className="border-b border-gold/50 pb-0.5">{a.linkedin ? 'View LinkedIn' : connectLabel}</span>
                          <span className="text-gold transition-transform group-hover:translate-x-0.5">↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="horizon-strong relative py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="kicker text-gold-bright">{dict.about.advisoryKicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">{dict.about.advisoryTitle}</h2>
            <div className="mt-6 h-px w-24 bg-gold/60" />
            <p className="mt-6 font-body text-lg leading-[1.8] text-ivory/80">{dict.about.advisoryBody}</p>
          </Reveal>
          <div className="mt-16 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryBoard.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 80}>
                <article className="group flex h-full flex-col border border-white/10 bg-white/[0.04] shadow-[0_2px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.07]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                    <h3 className="font-display text-2xl font-semibold text-ivory">{m.name}</h3>
                    <p className="mt-2 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-gold-bright">{m.role}</p>
                    <div className="mt-3 flex items-center gap-2.5">
                      <span className="h-px w-6 bg-gold/50" />
                      <span className="font-body text-xs uppercase tracking-[0.16em] text-ivory/55">{m.country}</span>
                    </div>
                    <p className="mt-5 font-body text-[15px] leading-[1.75] text-ivory/80">{m.bio}</p>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ivory transition-colors hover:text-gold-bright"
                      >
                        <span className="border-b border-gold/50 pb-0.5">View LinkedIn</span>
                        <span className="text-gold-bright transition-transform group-hover:translate-x-0.5">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-sand py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">{dict.about.partnersTitle}</h2>
            <p className="mt-5 font-body leading-relaxed text-ink/80">{dict.about.partnersBody}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.about.partnerGroups.map((g, i) => (
              <Reveal key={g.label} delay={(i % 3) * 80}>
                <div className="h-full border-t-2 border-gold bg-white p-6">
                  <p className="kicker text-gold">{g.label}</p>
                  <ul className="mt-3 space-y-2">
                    {g.items.map((it) => (
                      <li key={it.name} className="font-body text-[15px] text-navy">
                        {it.url ? (
                          <a href={it.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 border-b border-gold/50 pb-0.5 font-semibold transition-colors hover:text-gold">
                            {it.name} <span className="text-gold">↗</span>
                          </a>
                        ) : (
                          <span>{it.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 font-body text-sm italic text-ink/55">{dict.about.partnersNote}</p>
            <Link href={`/${locale}/join`} className="btn-ghost-dark mt-6">
              {dict.cta.partner}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
