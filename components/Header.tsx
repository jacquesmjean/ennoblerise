'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Dict, Locale } from '@/lib/i18n';
import { locales, localeNames } from '@/lib/i18n';

export default function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const nav = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/programs`, label: dict.nav.programs },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/join`, label: dict.nav.join },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const switchPath = (l: string) => {
    const parts = pathname.split('/');
    parts[1] = l;
    return parts.join('/') || `/${l}`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-navy/95 backdrop-blur-md shadow-[0_1px_0_rgba(201,162,39,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={dict.meta.siteName}>
          <Image
            src="/images/emblem.png"
            alt=""
            width={46}
            height={46}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="font-display leading-tight text-ivory">
            <span className="block text-[17px] font-semibold tracking-wide">
              Ennoble<span className="text-gold-bright">Rise</span>
              <span className="align-super text-[9px]">™</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider2 text-gold-bright/90">
              Global Trust
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                pathname.startsWith(item.href)
                  ? 'text-gold-bright'
                  : 'text-ivory/80 hover:text-gold-bright'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 font-body text-[12px] font-semibold uppercase tracking-widest text-ivory/80 hover:text-gold-bright transition-colors"
              aria-expanded={langOpen}
              aria-label="Language"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
              </svg>
              {locale}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-9 min-w-[150px] border border-gold/30 bg-navy py-2 shadow-xl">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={switchPath(l)}
                    className={`block px-4 py-2 font-body text-sm ${
                      l === locale ? 'text-gold-bright' : 'text-ivory/85 hover:text-gold-bright'
                    }`}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${locale}/donate`} className="btn-gold hidden !py-2.5 !px-5 md:inline-flex">
            {dict.nav.donate}
          </Link>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-navy px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-base font-semibold uppercase tracking-widest text-ivory/90 hover:text-gold-bright"
              >
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/donate`} className="btn-gold mt-2 w-full">
              {dict.nav.donate}
            </Link>
            <div className="mt-3 flex gap-4">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchPath(l)}
                  className={`font-body text-sm ${l === locale ? 'text-gold-bright' : 'text-ivory/70'}`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
