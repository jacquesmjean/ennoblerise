import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { privacyData } from '@/lib/legalData';
import LegalPage from '@/components/LegalPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = privacyData[(locale as Locale) in privacyData ? (locale as Locale) : 'en'];
  return {
    title: { absolute: doc.metaTitle },
    description: doc.metaDescription,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const doc = privacyData[(locale as Locale) in privacyData ? (locale as Locale) : 'en'];
  return <LegalPage doc={doc} />;
}
