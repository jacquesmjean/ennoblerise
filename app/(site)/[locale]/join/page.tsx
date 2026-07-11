import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import JoinForm from '@/components/forms/JoinForm';
import Reveal from '@/components/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.join.metaTitle },
    description: dict.join.metaDescription,
    alternates: { canonical: `/${locale}/join` },
  };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);
  const j = dict.join;

  return (
    <>
      <section className="horizon relative pt-40 pb-20 text-ivory md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{j.kicker}</p>
          <h1 className="mt-5 animate-rise font-display text-4xl font-medium md:text-6xl" style={{ animationDelay: '150ms' }}>
            {j.title}
          </h1>
          <p className="mt-6 max-w-2xl animate-rise font-body text-lg leading-relaxed text-ivory/85" style={{ animationDelay: '300ms' }}>
            {j.lead}
          </p>
        </div>
      </section>

      <section className="grain bg-ivory py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="space-y-6 md:col-span-5">
            {j.roles.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div className="border-t border-navy/15 pt-5">
                  <h3 className="font-display text-xl font-semibold text-navy">{r.name}</h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-ink/75">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={150}>
              <JoinForm dict={dict} locale={locale} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
