import type { LegalDoc } from '@/lib/legalData';
import ArcDivider from '@/components/ArcDivider';
import Reveal from '@/components/Reveal';

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="horizon relative pt-40 pb-28 text-ivory md:pb-40">
        <div className="mx-auto max-w-3xl px-5 md:px-0">
          <p className="kicker animate-rise text-gold-bright">EnnobleRise Global Trust™</p>
          <h1 className="mt-5 animate-rise font-display text-4xl font-medium md:text-5xl" style={{ animationDelay: '150ms' }}>
            {doc.title}
          </h1>
          <p className="mt-4 animate-rise font-body text-sm text-ivory/60" style={{ animationDelay: '280ms' }}>
            {doc.updated}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      <section className="grain bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-0">
          <Reveal>
            <p className="font-display text-xl italic leading-relaxed text-navy md:text-2xl">{doc.intro}</p>
          </Reveal>
          <div className="mt-12 space-y-10">
            {doc.sections.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i, 4) * 60}>
                <div className="border-t border-navy/10 pt-6">
                  <h2 className="font-display text-xl font-semibold text-navy md:text-2xl">
                    <span className="mr-3 font-body text-xs font-bold text-gold">{String(i + 1).padStart(2, '0')}</span>
                    {s.h}
                  </h2>
                  <p className="mt-3 font-body text-[15.5px] leading-[1.85] text-ink/80">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
