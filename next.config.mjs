/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // Serve the preserved static funnel at a clean /master-ai URL.
    return [
      { source: '/master-ai', destination: '/master-ai/index.html' },
    ];
  },
  async redirects() {
    return [
      { source: '/free', destination: '/access', permanent: false },
      // Vaida Stone alias redirects
      { source: '/vaidastone', destination: '/vaida', permanent: false },
      { source: '/vaida-stone', destination: '/vaida', permanent: false },
      { source: '/vaidastone/ai', destination: '/vaida/ai', permanent: false },
      { source: '/vaida-stone/ai', destination: '/vaida/ai', permanent: false },
      // Iconic Times / Ambassador alias redirects
      { source: '/iconictimes', destination: '/iconic', permanent: false },
      { source: '/iconic-times', destination: '/iconic', permanent: false },
      { source: '/ambassador', destination: '/iconic', permanent: false },
      { source: '/temisan', destination: '/iconic', permanent: false },
      // Master AI & Access funnel alias redirects
      { source: '/masterai', destination: '/master-ai', permanent: false },
      { source: '/ai-course', destination: '/access', permanent: false },
      { source: '/book', destination: '/access', permanent: false },
      { source: '/course', destination: '/access', permanent: false },
      { source: '/free-course', destination: '/access', permanent: false },
      { source: '/free-book', destination: '/access', permanent: false },
      { source: '/gift', destination: '/access', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
