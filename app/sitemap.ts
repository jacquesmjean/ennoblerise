export const dynamic = "force-static";

import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { locales } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ennoblerise.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/programs', '/scholarship', '/blog', '/donate', '/join', '/contact', '/privacy', '/terms'];
  const posts = getAllPosts();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
