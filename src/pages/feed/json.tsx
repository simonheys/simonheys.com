import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { getBlogFeeds } from '../../modules/feed';

const Json: FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const feeds = await getBlogFeeds();
    if (feeds) {
      res.setHeader('Content-Type', 'application/json');
      res.write(feeds.json);
      res.end();
    }
  }
  return {
    props: {},
  };
};

export default Json;
