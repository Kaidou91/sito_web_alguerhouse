/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/it',
        permanent: false
      }
    ];
  },
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  i18n: {
    locales: ['it', 'en', 'de', 'fr'],
    defaultLocale: 'it'
  }
};

export default nextConfig;
