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
  const {
    path,
    title,
    description,
    excerpt,
    subtitle,
    header,
    fill,
    components,
  } = page;
  const pageTitle = React.useMemo(() => {
    return [title, subtitle, ...meta.titles].filter(Boolean).join(" – ");
  }, [subtitle, title]);
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || subtitle}></meta>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@simonheys" />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={description || subtitle || excerpt}
        ></meta>
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/og/image.png`}
        />
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
