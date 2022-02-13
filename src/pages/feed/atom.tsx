import { GetServerSideProps } from "next";

import { getBlogFeeds } from "../../modules/feed";

const Atom: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const feeds = await getBlogFeeds();
    res.setHeader("Content-Type", "text/xml");
    res.write(feeds.atom);
    res.end();
  }
  return {
    props: {},
  };
};

export default Atom;
