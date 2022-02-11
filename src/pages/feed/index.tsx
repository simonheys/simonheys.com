import { GetServerSideProps } from "next";

import {
  getBlogDateFromPath,
  getBlogPagePaths,
  getMeta,
  getPageForPath,
} from "../../modules/content";

const Rss: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const pagePaths = getBlogPagePaths();
    const meta = getMeta();
    const page = getPageForPath("/");

    const title = meta.titles.join(" – ");
    const description = page.description;
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}`;

    console.log(JSON.stringify({ meta, page }, null, 2));

    let latestPostDate: Date;
    let rssItemsXml = "";

    pagePaths.forEach((path) => {
      const date = getBlogDateFromPath(path);
      const post = getPageForPath(path);
      if (!latestPostDate || date > latestPostDate) {
        latestPostDate = date;
      }
      if (post) {
        rssItemsXml += `
  <item>
    <title>${post.title}</title>
    <link>${process.env.NEXT_PUBLIC_BASE_URL}${path}</link>
    <pubDate>${date.toUTCString()}</pubDate>
    <description>
      <![CDATA[${post.excerpt}]]>
    </description>
  </item>`;
      }
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
    <channel>
        <title>${title}</title>
        <link>${link}</link>
        <description>${description}</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`);
    res.end();
  }
  return {
    props: {},
  };
};

export default Rss;
