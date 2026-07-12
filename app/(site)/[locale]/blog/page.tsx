import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/lib/blog';
import { getDict, type Locale } from '@/lib/i18n';
import { themesData, currentThemeIndex } from '@/lib/themesData';
import Reveal from '@/components/Reveal';
import ArcDivider from '@/components/ArcDivider';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.blog.metaTitle },
    description: dict.blog.metaDescription,
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);
  const posts = getAllPosts();
  const themes = themesData[locale] ?? themesData.en;
  const nowIdx = currentThemeIndex(new Date());
  const [featured, ...rest] = posts;
  const featuredFull = featured ? getPost(featured.slug) : null;

  const fmt = (date: string) =>
    new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <>
      <section className="horizon relative pt-40 pb-32 text-ivory md:pb-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="kicker animate-rise text-gold-bright">{featured?.category}</p>
          <h1 className="mt-5 animate-rise font-display text-5xl font-medium md:text-6xl" style={{ animationDelay: '150ms' }}>
            {dict.blog.title}
          </h1>
          <p className="mt-6 max-w-2xl animate-rise font-body text-lg text-ivory/85" style={{ animationDelay: '300ms' }}>
            {dict.blog.lead}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ArcDivider fill="#ffffff" />
        </div>
      </section>

      <section className="grain bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {featured && (
            <Reveal>
              <Link
                href={`/${locale}/blog/${featured.slug}`}
                className="group grid gap-8 border-b border-navy/10 pb-16 md:grid-cols-12"
              >
                {featuredFull?.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden md:col-span-6">
                    <Image
                      src={featuredFull.heroImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="md:col-span-5 md:col-start-8">
                  <p className="font-body text-xs uppercase tracking-wider2 text-gold">
                    {fmt(featured.date)} · {featured.readMinutes} {dict.blog.minRead}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-navy transition-colors group-hover:text-gold md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 font-body leading-relaxed text-ink/75">{featured.excerpt}</p>
                  <span className="mt-6 inline-block border-b border-gold pb-0.5 font-body text-sm font-semibold text-navy">
                    {dict.blog.readMore} →
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link href={`/${locale}/blog/${post.slug}`} className="group block border-t border-navy/10 pt-6">
                  <p className="font-body text-xs uppercase tracking-wider2 text-gold">
                    {fmt(post.date)} · {post.readMinutes} {dict.blog.minRead}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy transition-colors group-hover:text-gold md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ink/70">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— MONTHLY THEMES ——— */}
      <section className="horizon py-24 text-ivory md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-2xl">
            <p className="kicker text-gold-bright">{themes.kicker}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">{themes.title}</h2>
            <p className="mt-5 font-body leading-relaxed text-ivory/80">{themes.intro}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {themes.themes.map((t, i) => (
              <Reveal key={t.month} delay={(i % 4) * 70}>
                <div
                  className={`h-full border p-5 transition-colors ${
                    i === nowIdx
                      ? 'border-gold-bright bg-gold-bright/10'
                      : 'border-ivory/15 bg-white/5 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-body text-[11px] uppercase tracking-wider2 text-ivory/55">{t.month}</p>
                    {i === nowIdx && (
                      <span className="bg-gold-bright px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                        {themes.currentLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-gold-bright">{t.theme}</h3>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-ivory/70">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
