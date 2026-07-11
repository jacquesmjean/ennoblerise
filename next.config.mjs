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
    ],
  },
};

export default nextConfig;
