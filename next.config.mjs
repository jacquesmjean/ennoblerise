const isExport = process.env.PREVIEW_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isExport ? { output: 'export', trailingSlash: true } : {}),
  images: {
    ...(isExport ? { unoptimized: true } : {}),
    remotePatterns: [
      { protocol: 'https', hostname: 'images.leadconnectorhq.com' },
      { protocol: 'https', hostname: 'assets.cdn.filesafe.space' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'stcdn.leadconnectorhq.com' },
      // Photos managed in Mission Control may live on the site itself or in its storage bucket.
      { protocol: 'https', hostname: 'ennoblerise.org' },
      { protocol: 'https', hostname: 'knsuzpcaatwfevulphhw.supabase.co' },
    ],
  },
};

export default nextConfig;
