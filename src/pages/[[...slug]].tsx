import * as React from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import {
  Component,
  getMeta,
  Page as PageType,
  getPagePaths,
  getPageForPath,
  getComponentsForPath,
  content,
} from "../modules/content";

import Components, { MappedComponent } from "../components/Components";
import Fill from "../components/ui/Fill";

const meta = getMeta();

export type PageProp = PageType & {
  header: Component;
};

export interface PageProps {
  page: PageProp;
}

const Page: React.FC<PageProps> = ({ page }) => {
  const { path, title, description, subtitle, header, fill, components } = page;
  const pageTitle = React.useMemo(() => {
    return [title, subtitle, ...meta.titles].filter(Boolean).join(" – ");
  }, [subtitle, title]);

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="description" content={description || subtitle}></meta>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@simonheys" />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={description || subtitle}
        ></meta>
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/og/image.png`}
        />
        <link rel="preconnect" href="https://player.vimeo.com"></link>
        <link
          rel="preconnect"
          href="https://player.vimeo.com"
          crossOrigin="anonymous"
        ></link>
        <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon/favicon-48x48.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-touch-icon-57x57.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-touch-icon-60x60.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-touch-icon-72x72.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-touch-icon-76x76.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-touch-icon-114x114.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-touch-icon-120x120.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-touch-icon-144x144.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-touch-icon-152x152.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/favicon/apple-touch-icon-167x167.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon-180x180.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="1024x1024"
          href="/favicon/apple-touch-icon-1024x1024.png"
        ></link>
      </Head>
      {fill ? (
        <Fill>
          <MappedComponent {...header} />
          <MappedComponent {...fill} />
        </Fill>
      ) : (
        <MappedComponent {...header} />
      )}
      <Components components={components} key={path} />
    </React.Fragment>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPagePaths();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = [] } = params;
  const page = getPageForPath(slug);
  const components = getComponentsForPath(slug);
  return {
    props: {
      params,
      page: {
        ...page,
        header: content.all.header,
        components,
      },
    },
  };
};
