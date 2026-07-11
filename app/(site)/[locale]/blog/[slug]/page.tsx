import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, markdownToHtml } from '@/lib/blog';
import { getDict, locales, type Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ennoblerise.org';

export function generateStaticParams() {
  const posts = getAllPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | EnnobleRise Global Trust` },
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const dict = getDict(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.body);
  const fmt = new Date(post.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.heroImage,
    author: {
      '@type': 'Person',
      name: post.author,
      alternateName: 'Dr. Kas Henry',
    },
    publisher: {
      '@type': 'NGO',
      name: 'EnnobleRise Global Trust',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article>
        <header className="horizon relative pt-40 pb-16 text-ivory md:pb-20">
          <div className="mx-auto max-w-3xl px-5 md:px-0">
            <Link
              href={`/${locale}/blog`}
              className="font-body text-xs uppercase tracking-wider2 text-gold-bright hover:text-gold-pale transition-colors"
            >
              ← {dict.blog.backToBlog}
            </Link>
            <h1 className="mt-6 font-display text-3xl font-semibold leading-tight md:text-[2.75rem] md:leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-6 font-body text-sm text-ivory/70">
              {dict.blog.by} <span className="text-gold-bright">{post.author}</span> · {fmt} ·{' '}
              {post.readMinutes} {dict.blog.minRead}
            </p>
          </div>
        </header>

        {post.heroImage && (
          <div className="mx-auto -mt-2 max-w-4xl px-5 md:px-0">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        )}

        <div className="grain bg-ivory py-16 md:py-20">
          <div
            className="prose-er mx-auto max-w-3xl px-5 md:px-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="mx-auto mt-16 max-w-3xl border-t border-navy/10 px-5 pt-10 md:px-0">
            <p className="kicker text-gold">{dict.blog.by}</p>
            <p className="mt-3 font-display text-xl font-semibold text-navy">{post.author}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              {dict.founder.sub} — EnnobleRise Global Trust™
            </p>
            <Link href={`/${locale}/about`} className="btn-ghost-dark mt-6 !px-5 !py-2.5 text-xs">
              {dict.founder.cta}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
