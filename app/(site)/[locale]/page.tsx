import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import SunriseArc from '@/components/SunriseArc';
import ArcDivider from '@/components/ArcDivider';
import CountUp from '@/components/CountUp';
import CircularPillars from '@/components/CircularPillars';

/** Server-rendered word-by-word rise animation. */
function Words({ text, from = 0, step = 90 }: { text: string; from?: number; step?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="word-rise" style={{ animationDelay: `${from + i * step}ms` }}>
          {w}
          {' '}
        </span>
      ))}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.homeDescription,
    alternates: { canonical: `/${locale}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="horizon-strong aurora relative flex min-h-[100svh] items-center overflow-hidden text-ivory">
        <Image
          src="/images/hero.jpg"
          alt="A joyful, diverse global community standing together in bright daylight"
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
        {/* Left scrim for text legibility — keeps the right side bright and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 md:px-8">
          <p className="kicker animate-rise text-gold-bright" style={{ animationDelay: '100ms' }}>
            {dict.hero.kicker}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[13vw] font-medium leading-[1.04] sm:text-6xl md:text-7xl">
            <Words text={dict.hero.titleA} from={250} />
            <em className="word-rise text-shimmer" style={{ animationDelay: `${250 + dict.hero.titleA.split(' ').length * 90}ms` }}>
              {dict.hero.titleEm}
            </em>
            <span className="word-rise" style={{ animationDelay: `${340 + dict.hero.titleA.split(' ').length * 90}ms` }}>.</span>
            <span className="mt-2 block">
              <Words text={dict.hero.titleB} from={500 + dict.hero.titleA.split(' ').length * 90} step={70} />
            </span>
          </h1>
          <p
            className="mt-8 max-w-2xl animate-rise font-body text-lg leading-relaxed text-ivory/85"
            style={{ animationDelay: '420ms' }}
          >
            {dict.hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: '560ms' }}>
            <Link href={`/${locale}/join`} className="btn-gold">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}/programs`} className="btn-ghost-light">
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-[88px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-[128px]">
          <p className="kicker text-ivory/70">{dict.hero.scroll}</p>
          <div className="scroll-hint" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-[5]">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      {/* ——— PHILOSOPHY ——— */}
      <section className="grain bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="md:col-span-5">
            <p className="kicker text-gold">{dict.philosophy.kicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-snug text-navy md:text-[2.6rem] md:leading-[1.2]">
              {dict.philosophy.title}
            </h2>
            <SunriseArc className="mt-8 h-12 w-40" />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <p className="font-body text-lg leading-[1.85] text-ink/90">{dict.philosophy.body1}</p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 font-body text-lg leading-[1.85] text-ink/90">{dict.philosophy.body2}</p>
            </Reveal>
            <Reveal delay={320}>
              <blockquote className="mt-10 border-l-2 border-gold pl-6">
                <p className="font-display text-xl italic leading-relaxed text-navy md:text-2xl">
                  “{dict.philosophy.quote}”
                </p>
                <cite className="mt-4 block font-body text-sm not-italic text-ink/60">
                  — {dict.philosophy.quoteAttr}
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— MISSION / VISION ——— */}
      <section className="horizon relative py-24 pb-36 text-ivory md:py-28 md:pb-48">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="border-t border-gold/50 pt-8">
              <h2 className="font-display text-2xl font-semibold text-gold-bright">
                {dict.mission.missionTitle}
              </h2>
              <p className="mt-5 font-body leading-[1.85] text-ivory/85">{dict.mission.missionBody}</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="border-t border-gold/50 pt-8">
              <h2 className="font-display text-2xl font-semibold text-gold-bright">
                {dict.mission.visionTitle}
              </h2>
              <p className="mt-5 font-body leading-[1.85] text-ivory/85">{dict.mission.visionBody}</p>
            </div>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#F5F3F0" />
        </div>
      </section>

      {/* ——— VALUES ——— */}
      <section className="grain bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-2xl">
            <p className="kicker text-gold">{dict.values.kicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-navy md:text-[2.6rem]">
              {dict.values.title}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {dict.values.items.map((v, i) => (
              <Reveal key={v.name} delay={i * 80}>
                <div className="value-card group border-t border-navy/15 p-4 pt-6 transition-colors hover:border-gold">
                  <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy">{v.name}</h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ink/75">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— PILLARS (circular navigator) ——— */}
      <section className="grain bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="kicker text-gold">{dict.pillars.kicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-navy md:text-[2.6rem]">
              {dict.pillars.title}
            </h2>
            <p className="mt-5 font-body text-ink/70">{dict.pillars.orbitHint}</p>
          </Reveal>
          <Reveal delay={120} className="mt-14 md:mt-20">
            <CircularPillars dict={dict} locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* ——— IMPACT ——— */}
      <section className="horizon-strong aurora relative overflow-hidden py-24 pb-40 text-ivory md:py-32 md:pb-52">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <p className="kicker text-gold-bright">{dict.impact.kicker}</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-semibold leading-snug md:text-4xl">
              {dict.impact.title}
            </h2>
            <p className="mt-6 font-display text-lg italic text-ivory/75">{dict.impact.line1}</p>
            <p className="font-display text-lg italic text-ivory/75">{dict.impact.line2}</p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-10 md:grid-cols-4">
            {dict.impact.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="border-t border-gold/40 pt-6">
                  <p className="font-display text-4xl font-semibold text-gold-bright md:text-5xl">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-3 font-body text-xs leading-relaxed text-ivory/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      {/* ——— FOUNDER ——— */}
      <section className="grain bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:px-8">
          <Reveal className="relative md:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/founder-journey.jpg"
                alt="A figure walking toward golden light over a mountain ridge at dawn"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden bg-navy px-6 py-4 md:block">
              <p className="font-display text-sm italic text-gold-bright">“{dict.founder.mantra}”</p>
            </div>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <p className="kicker text-gold">{dict.founder.kicker}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-navy md:text-4xl">
                {dict.founder.title}
              </h2>
              <p className="mt-1 font-body text-sm font-semibold uppercase tracking-widest text-gold">
                {dict.founder.sub}
              </p>
              <p className="mt-6 font-body leading-[1.8] text-ink/85">{dict.founder.body1}</p>
              <p className="mt-4 font-body leading-[1.8] text-ink/85">{dict.founder.body2}</p>
              <Link href={`/${locale}/about`} className="btn-ghost-dark mt-8">
                {dict.founder.cta}
              </Link>
              <div className="mt-6 flex flex-col gap-2">
                <a href="https://www.amazon.com/Ennobled-Success-Civil-War-CFO-ebook/dp/B0DNP1S7GJ" target="_blank" rel="noopener" className="group inline-flex items-center gap-2 font-body text-sm text-navy transition-colors hover:text-gold">
                  <span className="text-gold">↗</span>
                  <span className="border-b border-gold/50 pb-0.5 group-hover:border-gold">{dict.founder.bookLink}</span>
                </a>
                <a href="https://blog.marquiswhoswho.com/kasthuri-henry-phd-ctp" target="_blank" rel="noopener" className="group inline-flex items-center gap-2 font-body text-sm text-navy transition-colors hover:text-gold">
                  <span className="text-gold">↗</span>
                  <span className="border-b border-gold/50 pb-0.5 group-hover:border-gold">{dict.founder.marquisLink}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— SCHOLARSHIP CALLOUT ——— */}
      <section className="bg-sand py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="grid items-center gap-8 border border-gold/40 bg-white p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-8">
                <p className="kicker text-gold">{dict.scholarshipCallout.kicker}</p>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-navy md:text-3xl">
                  {dict.scholarshipCallout.title}
                </h2>
                <p className="mt-4 max-w-2xl font-body leading-relaxed text-ink/75">
                  {dict.scholarshipCallout.body}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link href={`/${locale}/scholarship`} className="btn-gold">
                  {dict.scholarshipCallout.cta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="relative overflow-hidden bg-navy py-24 text-ivory md:py-28">
        <Image
          src="/images/unity.jpg"
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="kicker text-gold-bright">{dict.cta.kicker}</p>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-snug md:text-[2.75rem] md:leading-[1.2]">
              {dict.cta.title}
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${locale}/donate`} className="btn-gold">
                {dict.cta.donate}
              </Link>
              <Link href={`/${locale}/join`} className="btn-ghost-light">
                {dict.cta.join}
              </Link>
              <Link href={`/${locale}/join`} className="btn-ghost-light">
                {dict.cta.partner}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
