import { GetServerSideProps } from "next";

import { getBlogFeeds } from "../../modules/feed";

const Json: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const feeds = await getBlogFeeds();
    res.setHeader("Content-Type", "application/json");
    res.write(feeds.json);
    res.end();
  }
  return {
    props: {},
  };
};

export default Json;
