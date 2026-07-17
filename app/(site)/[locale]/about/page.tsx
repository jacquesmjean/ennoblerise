import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import { aboutStory } from '@/lib/aboutStory';
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

  const ambassadors = [
    { name: dict.pillars.youth.name, img: '/images/pillar-youth.jpg' },
    { name: dict.pillars.educators.name, img: '/images/pillar-educators.jpg' },
    { name: dict.pillars.women.name, img: '/images/pillar-women.jpg' },
  ];

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
                  src="/images/founder-journey.jpg"
                  alt="A journey from adversity toward golden light"
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
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {ambassadors.map((a, i) => (
              <Reveal key={a.name} delay={i * 120}>
                <div className="group relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-display text-2xl font-semibold text-ivory">{a.name}</h3>
                    <div className="mt-2 h-px w-10 bg-gold" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="grain bg-ivory py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <p className="kicker text-gold">{dict.about.advisoryKicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-navy md:text-4xl">{dict.about.advisoryTitle}</h2>
            <p className="mt-5 font-body leading-relaxed text-ink/80">{dict.about.advisoryBody}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border border-navy/10 bg-white p-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sand">
                    <span className="font-display text-2xl text-navy/25">◇</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold text-navy/40">{dict.about.advisorySoon}</p>
                  <p className="mt-1 font-body text-xs text-ink/40">{dict.about.advisoryCountry}</p>
                </div>
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
