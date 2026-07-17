'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Dict } from '@/lib/i18n';

export default function PrincipleCircle({ dict }: { dict: Dict }) {
  const items = dict.values.items;
  const [active, setActive] = useState(0);

  const N = items.length;
  const R = 41; // ring radius as % of the square container
  const nodes = items.map((it, i) => {
    const angle = (-90 + i * (360 / N)) * (Math.PI / 180);
    return {
      ...it,
      i,
      left: 50 + R * Math.cos(angle),
      top: 50 + R * Math.sin(angle),
      // spoke endpoints (leave a gap around emblem and node)
      x1: 50 + 14 * Math.cos(angle),
      y1: 50 + 14 * Math.sin(angle),
      x2: 50 + 30 * Math.cos(angle),
      y2: 50 + 30 * Math.sin(angle),
    };
  });

  return (
    <div>
      {/* ——— Desktop: radial compass ——— */}
      <div className="hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-[660px]">
          {/* orbit ring + spokes */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="41" fill="none" stroke="#D9A514" strokeWidth="0.25" strokeDasharray="0.4 1.6" opacity="0.6" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#1E3A8A" strokeWidth="0.15" opacity="0.08" />
            {nodes.map((n) => (
              <line
                key={n.i}
                x1={n.x1}
                y1={n.y1}
                x2={n.x2}
                y2={n.y2}
                stroke={active === n.i ? '#D9A514' : '#1E3A8A'}
                strokeWidth={active === n.i ? '0.4' : '0.2'}
                opacity={active === n.i ? '0.9' : '0.2'}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* center emblem */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-[0_10px_50px_-12px_rgba(30,58,138,0.4)] ring-1 ring-gold/40 lg:h-44 lg:w-44">
              <span className="absolute inset-0 animate-shimmer rounded-full ring-2 ring-gold/25" />
              <Image
                src="/images/emblem.png"
                alt="EnnobleRise Global Trust emblem"
                width={150}
                height={150}
                className="h-32 w-32 object-contain lg:h-36 lg:w-36"
              />
            </div>
          </div>

          {/* principle nodes */}
          {nodes.map((n) => {
            const isActive = active === n.i;
            return (
              <button
                key={n.i}
                type="button"
                onMouseEnter={() => setActive(n.i)}
                onFocus={() => setActive(n.i)}
                aria-label={n.name}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                style={{ left: `${n.left}%`, top: `${n.top}%` }}
              >
                <div
                  className={`flex h-28 w-28 flex-col items-center justify-center rounded-full border bg-white px-2 text-center transition-all duration-300 lg:h-[8.5rem] lg:w-[8.5rem] ${
                    isActive
                      ? 'scale-105 border-gold shadow-[0_18px_45px_-16px_rgba(217,165,20,0.65)]'
                      : 'border-navy/12 shadow-[0_8px_24px_-16px_rgba(30,58,138,0.4)] hover:border-gold/60'
                  }`}
                >
                  <span className={`font-display text-[11px] font-semibold ${isActive ? 'text-gold' : 'text-gold/70'}`}>
                    {String(n.i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 font-display text-[12px] font-semibold leading-tight text-navy lg:text-[13px]">
                    {n.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* active caption */}
        <div className="mx-auto mt-4 max-w-2xl text-center">
          <p className="font-display text-xl font-semibold text-navy">
            <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>{' '}
            {items[active].name}
          </p>
          <p className="mt-2 font-body leading-relaxed text-ink/75">{items[active].body}</p>
        </div>
      </div>

      {/* ——— Mobile: emblem + numbered list ——— */}
      <div className="md:hidden">
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gold/40">
            <Image src="/images/emblem.png" alt="" width={96} height={96} className="h-24 w-24 object-contain" />
          </div>
        </div>
        <div className="mt-8 space-y-5">
          {items.map((v, i) => (
            <div key={v.name} className="border-t border-navy/15 pt-4">
              <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-navy">{v.name}</h3>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-ink/75">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
