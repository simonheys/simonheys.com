/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => {
    return [
      {
        source: "/wordclock",
        destination: "/portfolio/wordclock",
        permanent: true,
      },
      {
        source: "/minimalfolio/:slug*",
        destination: "/portfolio/minimalfolio",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/makejpeg",
        destination: "https://github.com/simonheys/make-jpeg-droplet",
        permanent: true,
      },
      {
        source: "/feed/rss",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};
