import { Feed } from "feed";

import {
  getBlogDateFromPath,
  getBlogPagePaths,
  getMeta,
  getPageForPath,
} from "./content";

export const getBlogFeeds = async () => {
  const pagePaths = getBlogPagePaths();
  const meta = getMeta();
  const page = getPageForPath("/");

  if (!page) {
    return;
  }

  const title = meta.titles.join(" – ");
  const description = page.description;
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/og/image.png`;
  const favicon = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon/favicon.ico`;
  const year = new Date().getFullYear();
  const copyright = `All rights reserved ${year} Studio Heys Limited`;
  const updated = getBlogDateFromPath(pagePaths[0]);
  const author = {
    name: "Simon Heys",
    email: "si@simonheys.com",
    link: process.env.NEXT_PUBLIC_BASE_URL,
  };

  let latestPostDate: Date;

  const feed = new Feed({
    title,
    description,
    id: link,
    link,
    language: "en",
    image,
    favicon,
    copyright,
    updated,
    feedLinks: {
      rss2: `${process.env.NEXT_PUBLIC_BASE_URL}/feed/rss`,
      json: `${process.env.NEXT_PUBLIC_BASE_URL}/feed/json`,
      atom: `${process.env.NEXT_PUBLIC_BASE_URL}/feed/atom`,
    },
    author,
  });

  pagePaths.forEach((path) => {
    const date = getBlogDateFromPath(path);
    const post = getPageForPath(path);
    if (!latestPostDate || date > latestPostDate) {
      latestPostDate = date;
    }
    if (post) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
      feed.addItem({
        title: post.title || "Untitled",
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
