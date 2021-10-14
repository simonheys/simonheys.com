import { GetServerSideProps } from "next";

import * as contentModule from "../modules/content";

const Sitemap: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const pages = contentModule.getPagePaths();
    const sitemapContent = pages
      .map((path) => {
        const priority = ["/", "work", "/about"].includes(path) ? "1.0" : "0.5";
        const changefreq = "daily";
        return `<url><loc>${
          process.env.NEXT_PUBLIC_BASE_URL || ""
        }${path}</loc><priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`;
      })
      .join("\r\n");

    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapContent}
</urlset>`);
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
