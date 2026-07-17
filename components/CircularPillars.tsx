'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Dict, Locale } from '@/lib/i18n';

type Node = {
  key: 'youth' | 'educators' | 'women';
  img: string;
  ring: string;
  glow: string;
  pos: string; // desktop absolute position
};

export default function CircularPillars({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [active, setActive] = useState<string | null>(null);

  const nodes: Node[] = [
    { key: 'youth', img: '/images/pillar-youth.jpg', ring: 'ring-sky', glow: 'rgba(56,189,248,0.55)', pos: 'left-1/2 top-0 -translate-x-1/2' },
    { key: 'women', img: '/images/pillar-women.jpg', ring: 'ring-coral', glow: 'rgba(248,131,121,0.55)', pos: 'left-0 bottom-0' },
    { key: 'educators', img: '/images/pillar-educators.jpg', ring: 'ring-teal', glow: 'rgba(0,162,158,0.55)', pos: 'right-0 bottom-0' },
  ];

  return (
    <div>
      {/* ——— Desktop: orbit ——— */}
      <div className="relative mx-auto hidden aspect-square max-w-[620px] md:block">
        {/* dashed orbit ring + rising arcs */}
        <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="310" cy="310" r="232" fill="none" stroke="#D9A514" strokeWidth="1.5" strokeDasharray="2 9" opacity="0.5" />
          <circle cx="310" cy="310" r="232" fill="none" stroke="#1E3A8A" strokeWidth="1" opacity="0.08" />
        </svg>

        {/* center logo */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-[0_10px_50px_-12px_rgba(30,58,138,0.4)] ring-1 ring-gold/40 lg:h-48 lg:w-48">
            <span className="absolute inset-0 animate-shimmer rounded-full ring-2 ring-gold/25" />
            <Image src="/images/emblem.png" alt="EnnobleRise Global Trust emblem" width={150} height={150} className="h-32 w-32 object-contain lg:h-40 lg:w-40" />
          </div>
        </div>

        {/* pillar nodes */}
        {nodes.map((n) => {
          const data = dict.pillars[n.key];
          const isActive = active === n.key;
          return (
            <div key={n.key} className={`absolute z-10 ${n.pos}`}>
              <Link
                href={`/${locale}/programs#${n.key}`}
                onMouseEnter={() => setActive(n.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.key)}
                onBlur={() => setActive(null)}
                className="group block"
              >
                <div
                  className={`relative mx-auto overflow-hidden rounded-full ring-4 ${n.ring} transition-all duration-500 ease-out ${
                    isActive ? 'h-52 w-52 -translate-y-2' : 'h-40 w-40 lg:h-44 lg:w-44'
                  }`}
                  style={{ boxShadow: isActive ? `0 22px 60px -18px ${n.glow}` : '0 10px 30px -14px rgba(30,58,138,0.35)' }}
                >
                  <Image src={n.img} alt={data.name} fill className="object-cover" sizes="220px" />
                  <div className={`absolute inset-0 bg-navy/45 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                  <div className={`absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="font-display text-xl font-semibold text-ivory drop-shadow">{data.name}</span>
                  </div>
                </div>
                {/* pop card */}
                <div
                  className={`pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 border border-navy/10 bg-white p-4 text-center shadow-xl transition-all duration-300 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <p className="font-display text-lg font-semibold text-navy">{data.name}</p>
                  <p className="mt-1 font-body text-[13px] leading-snug text-ink/70">{data.program}</p>
                  <span className="mt-2 inline-block font-body text-xs font-semibold text-gold">{data.cta} →</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* ——— Mobile: stacked cards ——— */}
      <div className="grid gap-5 md:hidden">
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gold/40">
            <Image src="/images/emblem.png" alt="" width={96} height={96} className="h-24 w-24 object-contain" />
          </div>
        </div>
        {nodes.map((n) => {
          const data = dict.pillars[n.key];
          return (
            <Link key={n.key} href={`/${locale}/programs#${n.key}`} className={`flex items-center gap-4 border border-navy/10 bg-white p-3 ring-2 ${n.ring}`}>
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                <Image src={n.img} alt={data.name} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-navy">{data.name}</p>
                <p className="font-body text-[13px] leading-snug text-ink/65">{data.program}</p>
                <span className="mt-1 inline-block font-body text-xs font-semibold text-gold">{data.cta} →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
