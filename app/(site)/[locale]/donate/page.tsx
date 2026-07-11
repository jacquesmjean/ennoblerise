import type { Metadata } from 'next';
import Image from 'next/image';
import { getDict, type Locale } from '@/lib/i18n';
import DonateFlow from '@/components/forms/DonateFlow';
import Reveal from '@/components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.donate.metaTitle },
    description: dict.donate.metaDescription,
    alternates: { canonical: `/${locale}/donate` },
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);

  return (
    <section className="horizon-strong relative min-h-screen pt-40 pb-24 text-ivory">
      <Image src="/images/unity.jpg" alt="" fill className="object-cover opacity-15" sizes="100vw" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="kicker animate-rise text-gold-bright">{dict.donate.kicker}</p>
          <h1
            className="mt-6 animate-rise font-display text-3xl font-semibold leading-tight md:text-[2.6rem] md:leading-[1.2]"
            style={{ animationDelay: '150ms' }}
          >
            {dict.donate.title}
          </h1>
          <p
            className="mt-6 animate-rise font-body text-lg leading-relaxed text-ivory/80"
            style={{ animationDelay: '300ms' }}
          >
            {dict.donate.lead}
          </p>
          <div className="mt-10 hidden space-y-5 md:block">
            {dict.impact.stats.slice(0, 3).map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="flex items-baseline gap-4 border-l border-gold/40 pl-5">
                  <span className="font-display text-3xl font-semibold text-gold-bright">{s.value}</span>
                  <span className="font-body text-sm text-ivory/70">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <DonateFlow dict={dict} locale={locale} />
        </div>
      </div>
    </section>
  );
}
