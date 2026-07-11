import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { display, body } from '@/lib/fonts';
import { getDict, isLocale, locales, type Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Concierge from '@/components/Concierge';
import '@/app/globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ennoblerise.org';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.homeTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.homeDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    icons: { icon: '/images/logo.png' },
    openGraph: {
      siteName: dict.meta.siteName,
      type: 'website',
      locale,
      images: ['/images/og.jpg'],
    },
    twitter: { card: 'summary_large_image' },
  };
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'EnnobleRise Global Trust',
  alternateName: 'EnnobleRise',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  slogan: 'Dignity. Resilience. Global Change.',
  description:
    'EnnobleRise Global Trust is a catalyst for human-centered transformation — ennobling youth, educators, and women through emotional resilience, financial independence, and mindful leadership across 8+ countries on 5 continents.',
  email: 'Engage@EnnobleRise.Org',
  telephone: '+1-224-536-1603',
  founder: {
    '@type': 'Person',
    name: 'Dr. Kasthuri Henry',
    alternateName: 'Dr. Kas Henry',
    jobTitle: 'Founder & Executive Director',
    description:
      'Transformation executive, educator, social entrepreneur, and author of "Ennobled for Success: From Civil War to a US CFO".',
  },
  knowsAbout: [
    'youth leadership development',
    'educator professional development',
    "women's financial resilience",
    'emotional intelligence',
    'mindful leadership',
    'humane leadership',
  ],
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.linkedin.com/company/ennoblerise-global-trust',
    'https://www.facebook.com/ennoblerise',
    'https://www.instagram.com/ennoblerise',
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header dict={dict} locale={locale as Locale} />
        <main>{children}</main>
        <Footer dict={dict} locale={locale as Locale} />
        <Concierge dict={dict} locale={locale as Locale} />
      </body>
    </html>
  );
}
