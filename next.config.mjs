import createNextIntlPlugin from 'next-intl/plugin';

// Point the Next.js plugin to the i18n request configuration used by next-intl.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  }
};

export default withNextIntl(nextConfig);
