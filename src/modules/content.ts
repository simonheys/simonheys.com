import imageProperties from "../../content/image-properties.json";

type Link = {
  text: string;
  url: string;
};

type Component = {
  type: string;
  title?: any;
  subtitle?: string;
  links?: Link[];
  exclude?: string[];
};

type Page = {
  path: string;
  title?: string;
  subtitle?: string;
  description?: string;
  fill?: any;
  thumbnails?: any[];
  components?: Component[];
};

type ImageProperties = {
  width: number;
  height: number;
};

type Meta = {
  titles: string[];
  work: {
    pages: {
      path: string;
    }[];
  };
};

type Content = {
  meta: Meta;
  pages: Page[];
  all: {
    header: Component;
    before: Component[];
    after: Component[];
  };
};

export const content: Content = require("../../content/content.json");

export const getMeta = (): Meta => content.meta;

export const getPagePaths = (): string[] =>
  content.pages.map((page) => page.path).sort();

export const getPageForPath = (path: string): Page => {
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    path = path.substr(0, queryIndex);
  }
  return content.pages.find((page) => page.path === path);
};

export const getPageIndexForPath = (path: string): number =>
  content.pages.findIndex((page) => page.path === path);

export const getNextWorkPageForPath = (path: string): Page => {
  const workPages = content.meta.work.pages;
  const currentIndex = workPages.findIndex((page) => page.path === path);
  if (currentIndex === -1) {
    return null;
  }
  const nextIndex = (currentIndex + 1) % workPages.length;
  const nextPath = workPages[nextIndex].path;
  return getPageForPath(nextPath);
};

export const getPageForSlug = (slug: string[]): Page => {
  const path = "/" + slug.join("/");
  return getPageForPath(path);
};

export const getPropertiesForImage = (src: string): ImageProperties => {
  const properties = imageProperties[src];
  if (!properties) {
    console.warn(`getPropertiesForImage(${src}) - not found`, src);
    return { width: 42, height: 42 };
  }
  return properties;
};

export const getComponentsForSlug = (slug: string[]): Component[] => {
  const page = getPageForSlug(slug);
  const path = "/" + slug.join("/");
  // TODO: apply filtering to all
  const after = content.all.after.filter((pageComponent) => {
    if (pageComponent.exclude) {
      console.log({ path, exclude: pageComponent.exclude });
      if (pageComponent.exclude.includes(path)) {
        console.log("Excluding");
        return false;
      }
    }
    return true;
  });
  return [...content.all.before, ...page.components, ...after];
};
