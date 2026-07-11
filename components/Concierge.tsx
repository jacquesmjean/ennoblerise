'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { submitConciergeMessage } from '@/app/actions';
import type { Dict, Locale } from '@/lib/i18n';

type Turn = { from: 'concierge' | 'visitor'; text: string };
type OptionId = 'programs' | 'donate' | 'join' | 'partner' | 'founder' | 'human';

export default function Concierge({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [mode, setMode] = useState<'menu' | 'form' | 'sent'>('menu');
  const [activeLink, setActiveLink] = useState<{ href: string; label: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  const c = dict.concierge;

  useEffect(() => {
    if (open && turns.length === 0) {
      setTurns([{ from: 'concierge', text: c.greeting }]);
    }
  }, [open, turns.length, c.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns, mode]);

  const linkFor = (id: OptionId) => {
    switch (id) {
      case 'programs':
        return { href: `/${locale}/programs`, label: c.goPrograms };
      case 'donate':
        return { href: `/${locale}/donate`, label: c.goDonate };
      case 'join':
        return { href: `/${locale}/join`, label: c.goJoin };
      case 'founder':
        return { href: `/${locale}/about`, label: c.goAbout };
      default:
        return null;
    }
  };

  const choose = (id: OptionId) => {
    const option = c.options.find((o) => o.id === id);
    if (!option) return;
    setTurns((t) => [
      ...t,
      { from: 'visitor', text: option.label },
      { from: 'concierge', text: c.answers[id] },
    ]);
    setActiveLink(linkFor(id));
    if (id === 'human' || id === 'partner') {
      setMode('form');
    }
  };

  const reset = () => {
    setTurns([{ from: 'concierge', text: c.greeting }]);
    setMode('menu');
    setActiveLink(null);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={c.open}
        className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 border border-gold/60 bg-navy px-5 py-3.5 font-body text-xs font-semibold uppercase tracking-wider2 text-gold-bright shadow-[0_10px_40px_-10px_rgba(10,24,40,0.6)] transition-all hover:bg-navy-soft ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
        </span>
        {c.open}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-0 right-0 z-[70] flex h-[min(620px,92dvh)] w-full flex-col border border-gold/30 bg-navy shadow-2xl transition-all duration-500 sm:bottom-6 sm:right-6 sm:w-[400px] ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
        role="dialog"
        aria-label={c.title}
      >
        <div className="horizon flex items-start justify-between px-6 pb-5 pt-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-ivory">{c.title}</h2>
            <p className="mt-1 font-body text-xs text-gold-bright/90">{c.sub}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-ivory/60 hover:text-gold-bright transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {turns.map((t, i) => (
            <div key={i} className={`flex ${t.from === 'visitor' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-4 py-3 font-body text-sm leading-relaxed ${
                  t.from === 'visitor'
                    ? 'bg-gold text-navy'
                    : 'border border-ivory/15 bg-white/5 text-ivory/90'
                }`}
              >
                {t.text}
              </div>
            </div>
          ))}

          {activeLink && mode === 'menu' && (
            <div className="flex justify-start pl-1">
              <Link href={activeLink.href} onClick={() => setOpen(false)} className="btn-gold !px-5 !py-2.5 text-xs">
                {activeLink.label} →
              </Link>
            </div>
          )}

          {mode === 'form' && (
            <form
              className="space-y-3 border border-ivory/15 bg-white/5 p-4"
              action={(fd) => {
                fd.set('locale', locale);
                fd.set('topic', 'concierge');
                startTransition(async () => {
                  const res = await submitConciergeMessage(fd);
                  if (res.ok) {
                    setMode('sent');
                    setTurns((t) => [...t, { from: 'concierge', text: c.sent }]);
                  }
                });
              }}
            >
              <input name="name" required placeholder={c.namePlaceholder} className="field-dark !py-2.5 text-sm" />
              <input name="email" type="email" required placeholder={c.emailPlaceholder} className="field-dark !py-2.5 text-sm" />
              <textarea name="message" required rows={3} placeholder={c.messagePlaceholder} className="field-dark resize-none text-sm" />
              <button type="submit" disabled={pending} className="btn-gold w-full !py-2.5 text-xs disabled:opacity-60">
                {c.send}
              </button>
            </form>
          )}
        </div>

        <div className="border-t border-ivory/10 px-5 py-4">
          {mode !== 'form' && (
            <div className="flex flex-wrap gap-2">
              {(mode === 'sent' ? [] : c.options).map((o) => (
                <button
                  key={o.id}
                  onClick={() => choose(o.id as OptionId)}
                  className="border border-gold/40 px-3.5 py-2 font-body text-[12px] text-gold-pale hover:bg-gold hover:text-navy transition-colors text-left"
                >
                  {o.label}
                </button>
              ))}
              {(turns.length > 1 || mode === 'sent') && (
                <button
                  onClick={reset}
                  className="border border-ivory/20 px-3.5 py-2 font-body text-[12px] text-ivory/60 hover:text-ivory transition-colors"
                >
                  {c.back}
                </button>
              )}
            </div>
          )}
          {mode === 'form' && (
            <button onClick={reset} className="font-body text-[12px] text-ivory/60 hover:text-ivory transition-colors">
              ← {c.back}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
