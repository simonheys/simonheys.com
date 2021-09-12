module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/wordclock",
        destination: "/work/wordclock",
        permanent: true,
      },
      {
        source: "/minimalfolio",
        destination: "/work/minimalfolio",
        permanent: true,
      },
    ];
  },
};
