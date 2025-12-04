import { Feed } from 'feed';

import { getServerSideURL } from '@/utils/getURL';

import {
  getBlogDateFromPath,
  getBlogPagePaths,
  getMeta,
  getPageForPath,
} from './content';

export const getBlogFeeds = async () => {
  const pagePaths = getBlogPagePaths();
  const meta = getMeta();
  const page = getPageForPath('/');

  if (!page) {
    return;
  }

  if (pagePaths.length === 0) {
    return;
  }

  const title = meta.titles.join(' – ');
  const description = page.description;
  const baseUrl = getServerSideURL();
  const link = baseUrl;
  const image = `${baseUrl}/og/image.png`;
  const favicon = `${baseUrl}/favicon/favicon.ico`;
  const year = new Date().getFullYear();
  const copyright = `All rights reserved ${year} Studio Heys Limited`;
  const updated = getBlogDateFromPath(pagePaths[0]);
  const author = {
    name: 'Simon Heys',
    email: 'si@simonheys.com',
    link: baseUrl,
  };

  const feed = new Feed({
    title,
    description,
    id: link,
    link,
    language: 'en',
    image,
    favicon,
    copyright,
    updated,
    feedLinks: {
      rss2: `${baseUrl}/feed/rss`,
      json: `${baseUrl}/feed/json`,
      atom: `${baseUrl}/feed/atom`,
    },
    author,
  });

  pagePaths.forEach((path) => {
    const date = getBlogDateFromPath(path);
    const post = getPageForPath(path);
    if (post) {
      const url = `${baseUrl}${path}`;
      feed.addItem({
        title: post.title || 'Untitled',
        id: url,
        link: url,
        description: post.excerpt,
        author: [author],
        contributor: [author],
        date,
      });
    }
  });

  const rss = feed.rss2();
  const atom = feed.atom1();
  const json = feed.json1();

  return {
    rss,
    atom,
    json,
  };
};
