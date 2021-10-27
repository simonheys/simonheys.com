module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/wordclock",
        destination: "/work/wordclock",
        permanent: true,
      },
      {
        source: "/portfolio/wordclock",
        destination: "/work/wordclock",
        permanent: true,
      },
      {
        source: "/minimalfolio/:slug*",
        destination: "/work/minimalfolio",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/work",
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
    ];
  },
};
