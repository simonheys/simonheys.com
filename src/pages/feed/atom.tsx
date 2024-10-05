import { GetServerSideProps } from "next";
import { FC } from "react";

import { getBlogFeeds } from "../../modules/feed";

const Atom: FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const feeds = await getBlogFeeds();
    if (feeds) {
      res.setHeader("Content-Type", "text/xml");
      res.write(feeds.atom);
      res.end();
    }
  }
  return {
    props: {},
  };
};

export default Atom;
