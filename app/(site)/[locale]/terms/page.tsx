import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { termsData } from '@/lib/legalData';
import LegalPage from '@/components/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = termsData[(locale as Locale) in termsData ? (locale as Locale) : 'en'];
  return {
    title: { absolute: doc.metaTitle },
    description: doc.metaDescription,
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const doc = termsData[(locale as Locale) in termsData ? (locale as Locale) : 'en'];
  return <LegalPage doc={doc} />;
}
