import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import ContactForm from '@/components/forms/ContactForm';
import SocialIcons from '@/components/SocialIcons';
import Reveal from '@/components/Reveal';
import ArcDivider from '@/components/ArcDivider';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.contact.metaTitle },
    description: dict.contact.metaDescription,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);
  const c = dict.contact;

  return (
    <>
      <section className="horizon relative pt-40 pb-32 text-ivory md:pb-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{c.kicker}</p>
          <h1 className="mt-5 max-w-3xl animate-rise font-display text-4xl font-medium md:text-5xl" style={{ animationDelay: '150ms' }}>
            {c.title}
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      <section className="grain bg-ivory py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker text-gold">{c.reachTitle}</p>
              <ul className="mt-6 space-y-4">
                {c.directory.map((d) => (
                  <li key={d.email}>
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-navy/50">{d.label}</p>
                    <a
                      href={`mailto:${d.email.toLowerCase()}`}
                      className="mt-0.5 inline-block border-b border-gold/60 pb-0.5 font-body text-ink/85 transition-colors hover:text-gold"
                    >
                      {d.email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-body text-sm text-ink/55">Toll-free line coming soon.</p>
              <div className="mt-8 rounded-none bg-navy p-5">
                <SocialIcons />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={120}>
              <ContactForm dict={dict} locale={locale} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
