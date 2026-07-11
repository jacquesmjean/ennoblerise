import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import Reveal from '@/components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.programs.metaTitle },
    description: dict.programs.metaDescription,
    alternates: { canonical: `/${locale}/programs` },
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);

  const pillars = [
    { id: 'youth', data: dict.pillars.youth, details: dict.programs.youthDetail, img: '/images/pillar-youth.jpg' },
    { id: 'educators', data: dict.pillars.educators, details: dict.programs.educatorsDetail, img: '/images/pillar-educators.jpg' },
    { id: 'women', data: dict.pillars.women, details: dict.programs.womenDetail, img: '/images/pillar-women.jpg' },
  ];

  return (
    <>
      <section className="horizon relative pt-40 pb-20 text-ivory md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{dict.pillars.kicker}</p>
          <h1 className="mt-5 animate-rise font-display text-5xl font-medium md:text-6xl" style={{ animationDelay: '150ms' }}>
            {dict.programs.title}
          </h1>
          <p className="mt-6 max-w-2xl animate-rise font-body text-lg leading-relaxed text-ivory/85" style={{ animationDelay: '300ms' }}>
            {dict.programs.lead}
          </p>
        </div>
      </section>

      {pillars.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`grain scroll-mt-24 py-24 md:py-28 ${i % 2 === 0 ? 'bg-ivory' : 'bg-sand'}`}
        >
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-12 md:px-8">
            <Reveal className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-2 md:col-start-7' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.data.program}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : 'md:col-start-8'}`}>
              <Reveal delay={100}>
                <span className="font-display text-6xl font-light text-gold/40">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-2 font-display text-3xl font-semibold text-navy">{p.data.name}</h2>
                <p className="mt-2 font-body text-sm font-semibold uppercase tracking-widest text-gold">
                  {p.data.program}
                </p>
                <p className="mt-5 font-body leading-[1.8] text-ink/85">{p.data.body}</p>
                <p className="kicker mt-8 text-gold">{dict.programs.howKicker}</p>
                <ul className="mt-4 space-y-3">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-3 font-body text-[15px] leading-relaxed text-ink/80">
                      <span className="mt-[2px] text-gold">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="horizon-strong py-24 text-ivory md:py-28">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold md:text-4xl">
              {dict.programs.applyTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body leading-relaxed text-ivory/80">
              {dict.programs.applyBody}
            </p>
            <Link href={`/${locale}/join`} className="btn-gold mt-9">
              {dict.programs.applyCta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
