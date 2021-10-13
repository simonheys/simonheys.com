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
  description?: string;
  fill?: any;
  thumbnails?: Thumbnail[];
  components?: Component[];
};

export type ImageProperties = {
  width: number;
  height: number;
};

export type Meta = {
  titles: string[];
  work: {
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

export const getPageForSlug = (slug: string | string[]): Page => {
  const path = pathFromSlug(slug);
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

export const getComponentsForSlug = (slug: string | string[]): Component[] => {
  const page = getPageForSlug(slug);
  const path = pathFromSlug(slug);
  // TODO: apply filtering to all
  const after = content.all.after.filter((pageComponent) => {
    if (pageComponent.exclude) {
      if (pageComponent.exclude.includes(path)) {
        return false;
      }
    }
    return true;
  });
  return [...content.all.before, ...page.components, ...after];
};

export const pathFromSlug = (slug: string | string[]): string => {
  if (Array.isArray(slug)) {
    const path = "/" + slug.join("/");
    return path;
  }
  return slug;
};
