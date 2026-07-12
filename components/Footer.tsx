import Link from 'next/link';
import Image from 'next/image';
import type { Dict, Locale } from '@/lib/i18n';
import SocialIcons from './SocialIcons';
import NewsletterForm from './NewsletterForm';
import SunriseArc from './SunriseArc';

export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  const year = new Date().getFullYear();

  const explore = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/programs`, label: dict.nav.programs },
    { href: `/${locale}/scholarship`, label: dict.nav.scholarship },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ];
  const engage = [
    { href: `/${locale}/donate`, label: dict.nav.donate },
    { href: `/${locale}/join`, label: dict.footer.volunteer },
    { href: `/${locale}/join`, label: dict.footer.ambassador },
    { href: `/${locale}/join`, label: dict.footer.partners },
  ];

  return (
    <footer className="horizon-strong relative text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/images/emblem.png" alt="" width={52} height={52} className="h-13 w-13 object-contain" />
              <span className="font-display leading-tight">
                <span className="block text-lg font-semibold">
                  Ennoble<span className="text-gold-bright">Rise</span>
                  <span className="align-super text-[10px]">™</span> Global Trust
                </span>
                <span className="block text-[10px] uppercase tracking-wider2 text-gold-bright">
                  {dict.meta.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-ivory/70">
              {dict.footer.blurb}
            </p>
            <SocialIcons className="mt-6" />
          </div>

          <div className="md:col-span-2">
            <h3 className="kicker text-gold-bright">{dict.footer.explore}</h3>
            <ul className="mt-4 space-y-2.5">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-body text-sm text-ivory/75 hover:text-gold-bright transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="kicker text-gold-bright">{dict.footer.engage}</h3>
            <ul className="mt-4 space-y-2.5">
              {engage.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="font-body text-sm text-ivory/75 hover:text-gold-bright transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="kicker text-gold-bright">{dict.footer.newsletter}</h3>
            <p className="mt-3 font-body text-xs text-ivory/55">{dict.footer.newsletterHint}</p>
            <div className="mt-4">
              <NewsletterForm dict={dict} locale={locale} />
            </div>
            <div className="mt-6 space-y-1 font-body text-sm text-ivory/70">
              <p>
                <a href="mailto:Engage@EnnobleRise.Org" className="hover:text-gold-bright transition-colors">
                  Engage@EnnobleRise.Org
                </a>
              </p>
              <p>
                <a href="tel:+12245361603" className="hover:text-gold-bright transition-colors">
                  +1 (224) 536-1603
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <SunriseArc className="h-10 w-36 opacity-70" />
          <p className="font-body text-xs text-ivory/45">
            © {year} EnnobleRise Global Trust™ — {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5 font-body text-[11px]">
            <Link href={`/${locale}/terms`} className="text-ivory/50 underline-offset-4 hover:text-gold-bright hover:underline transition-colors">
              {dict.footer.terms}
            </Link>
            <span className="text-ivory/25">·</span>
            <Link href={`/${locale}/privacy`} className="text-ivory/50 underline-offset-4 hover:text-gold-bright hover:underline transition-colors">
              {dict.footer.privacy}
            </Link>
          </div>
          <a
            href="https://techfides.com"
            target="_blank"
            rel="noopener"
            className="group font-body text-[11px] tracking-wide text-ivory/40 transition-colors hover:text-ivory/70"
          >
            Powered by{' '}
            <span className="font-semibold text-[#0EA5E9] transition-all group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
              TechFides
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
