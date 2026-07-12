export const dynamic = "force-static";

import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ennoblerise.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/applications/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
