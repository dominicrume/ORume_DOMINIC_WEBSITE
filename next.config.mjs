/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // The gated PDFs live outside public/ so they have no crawlable URL. They must
  // still be bundled with the function that serves them, or /api/download finds
  // nothing in production while working perfectly on a developer's machine.
  outputFileTracingIncludes: {
    '/api/download': ['./private-assets/**'],
  },
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
      // These PDFs used to sit in public/ and were directly downloadable. They
      // are gated now, so send any shared link to the form instead of a 404.
      { source: '/The_KYA_Method_Detailed_Edition.pdf', destination: '/#method', permanent: false },
      { source: '/THE_KYA_METHOD_ARCHITECTURE.pdf', destination: '/#method', permanent: false },
      { source: '/free', destination: '/access', permanent: false },
      { source: '/Free', destination: '/access', permanent: false },
      { source: '/FREE', destination: '/access', permanent: false },
      { source: '/free/:path*', destination: '/access', permanent: false },
      { source: '/Free/:path*', destination: '/access', permanent: false },
      { source: '/FREE/:path*', destination: '/access', permanent: false },
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
      { source: '/AI-course', destination: '/access', permanent: false },
      { source: '/AI-COURSE', destination: '/access', permanent: false },
      { source: '/book', destination: '/access', permanent: false },
      { source: '/Book', destination: '/access', permanent: false },
      { source: '/BOOK', destination: '/access', permanent: false },
      { source: '/course', destination: '/access', permanent: false },
      { source: '/Course', destination: '/access', permanent: false },
      { source: '/COURSE', destination: '/access', permanent: false },
      { source: '/free-course', destination: '/access', permanent: false },
      { source: '/Free-course', destination: '/access', permanent: false },
      { source: '/FREE-COURSE', destination: '/access', permanent: false },
      { source: '/free-book', destination: '/access', permanent: false },
      { source: '/Free-book', destination: '/access', permanent: false },
      { source: '/FREE-BOOK', destination: '/access', permanent: false },
      { source: '/gift', destination: '/access', permanent: false },
      { source: '/Gift', destination: '/access', permanent: false },
      { source: '/GIFT', destination: '/access', permanent: false },
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
