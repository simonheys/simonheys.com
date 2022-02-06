import imageProperties from "../../content/image-properties.json";

export type Link = {
  text: string;
  url: string;
};

export type Component = {
  type: string;
  title?: any;
  subtitle?: string;
  links?: Link[];
  exclude?: string[];
};

export type Thumbnail = {
  src: string;
};

export type Page = {
  path: string;
  title?: string;
  subtitle?: string;
  excerpt?: string;
  description?: string;
  fill?: any;
  thumbnails?: Thumbnail[];
  components?: Component[];
  meta?: {
    title?: string;
    subtitle?: string;
    text?: string;
    icon?: string;
  };
};

export type ImageProperties = {
  width: number;
  height: number;
  hash?: string;
  color?: string;
  type?: string;
};

export type Meta = {
  titles: string[];
  portfolio: {
    pages: {
      path: string;
    }[];
  };
  "case-studies": {
    pages: {
      path: string;
    }[];
  };
};

export type Content = {
  meta: Meta;
  pages: Page[];
  all: {
    header: Component;
    before: Component[];
    after: Component[];
  };
};

const defaultContent: Content = require("../../content/content.json");
export { defaultContent as content };

export const getMeta = (content: Content = defaultContent): Meta =>
  content.meta;

export const getPagePaths = (content: Content = defaultContent): string[] =>
  content.pages.map((page) => page.path).sort();

export const getPortfolioPagePaths = (
  content: Content = defaultContent
): string[] => {
  return content.meta.portfolio.pages.map((page) => page.path);
};

export const getCaseStudiesPagePaths = (
  content: Content = defaultContent
): string[] => {
  return content.meta["case-studies"].pages.map((page) => page.path);
};

export const getBlogPagePaths = (
  content: Content = defaultContent
): string[] => {
  const pagePaths = getPagePaths(content);
  const blogPagePaths = pagePaths
    .filter((path) => path.startsWith("/blog/"))
    .reverse();
  return blogPagePaths;
};

export const getBlogDateFromPath = (path: string): Date => {
  const components = path.split("/").filter(Boolean).slice(1, 4);
  console.log(components);
  return new Date(components.join("/"));
};

export const normalisePath = (path: string | string[]): string => {
  // allow array
  if (Array.isArray(path)) {
    path = path.join("/");
  }
  if (typeof path !== "string") {
    return "/";
  }
  // omit query
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    path = path.substr(0, queryIndex);
  }
  // convert multiple /// into single /, omit leading and trailing
  path = path.split("/").filter(Boolean).join("/");
  // re-add leading /
  path = `/${path}`;
  return path;
};

export const getPageForPath = (
  path: string | string[],
  content: Content = defaultContent
): Page => {
  const normalisedPath = normalisePath(path);
  const page = content.pages.find((page) => page.path === normalisedPath);
  return page;
};

export const getNextPortfolioPageForPath = (
  path: string | string[],
  content: Content = defaultContent
): Page => {
  const normalisedPath = normalisePath(path);
  const portfolioPagePaths = getPortfolioPagePaths(content);
  const currentIndex = portfolioPagePaths.indexOf(normalisedPath);
  if (currentIndex === -1) {
    return;
  }
  const nextIndex = (currentIndex + 1) % portfolioPagePaths.length;
  const nextPath = portfolioPagePaths[nextIndex];
  return getPageForPath(nextPath, content);
};

export const getNextCaseStudiesPageForPath = (
  path: string | string[],
  content: Content = defaultContent
): Page => {
  const normalisedPath = normalisePath(path);
  const caseStudiesPagePaths = getCaseStudiesPagePaths(content);
  const currentIndex = caseStudiesPagePaths.indexOf(normalisedPath);
  if (currentIndex === -1) {
    return;
  }
  const nextIndex = (currentIndex + 1) % caseStudiesPagePaths.length;
  const nextPath = caseStudiesPagePaths[nextIndex];
  return getPageForPath(nextPath, content);
};

export const getComponentsForPath = (
  path: string | string[],
  content: Content = defaultContent
): Component[] => {
  const normalisedPath = normalisePath(path);
  const page = getPageForPath(normalisedPath, content);
  const pageComponents = page ? page.components || [] : [];
  const components = [
    ...content.all.before,
    ...pageComponents,
    ...content.all.after,
  ];
  const filteredComponents = components.filter((pageComponent) => {
    if (pageComponent.exclude) {
      const exclude =
        typeof pageComponent.exclude === "string"
          ? [pageComponent.exclude]
          : pageComponent.exclude;
      if (exclude.includes(normalisedPath)) {
        return false;
      }
    }
    return true;
  });
  return filteredComponents;
};

export const getPropertiesForImage = (src: string): ImageProperties => {
  const properties = imageProperties[src];
  if (!properties) {
    console.warn(`getPropertiesForImage(${src}) - not found`, src);
    return { width: 42, height: 42 };
  }
  return properties;
};
