'use client';

import { useEffect, useRef } from 'react';

/** Animates values like "8+", "18", "3", "$150K" counting up on first view. */
export default function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ''));
    if (!Number.isFinite(target)) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value;
      return;
    }

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        io.disconnect();
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          const current = Math.round(target * eased);
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = value;
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
