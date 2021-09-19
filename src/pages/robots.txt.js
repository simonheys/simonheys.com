const Robots = () => null;

export const getServerSideProps = async ({ res }) => {
  if (res) {
    const policy = process.env.NEXT_PUBLIC_ALLOW_INDEX ? "Allow" : "Disallow";
    res.setHeader("Content-Type", "text/plain");
    res.write(`User-agent: * 
${policy}: /

Sitemap:${process.env.NEXT_PUBLIC_BASE_URL || ""}/sitemap.xml`);
    res.end();
  }
  return {
    props: {},
  };
};

export default Robots;
