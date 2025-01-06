import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  redirects: async () => {
    return [
      {
        source: '/wordclock',
        destination: '/portfolio/wordclock',
        permanent: true,
      },
      {
        source: '/minimalfolio/:slug*',
        destination: '/portfolio/minimalfolio',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/makejpeg',
        destination: 'https://github.com/simonheys/make-jpeg-droplet',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/feed/rss',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
