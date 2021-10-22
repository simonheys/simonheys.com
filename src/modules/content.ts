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
  hash?: string;
  color?: string;
  type?: string;
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

const defaultContent: Content = require("../../content/content.json");
export { defaultContent as content };

export const getMeta = (content: Content = defaultContent): Meta =>
  content.meta;

export const getPagePaths = (content: Content = defaultContent): string[] =>
  content.pages.map((page) => page.path).sort();

export const getWorkPagePaths = (
  content: Content = defaultContent
): string[] => {
  return content.meta.work.pages.map((page) => page.path);
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

export const getNextWorkPageForPath = (
  path: string | string[],
  content: Content = defaultContent
): Page => {
  const normalisedPath = normalisePath(path);
  const workPagePaths = getWorkPagePaths(content);
  const currentIndex = workPagePaths.indexOf(normalisedPath);
  if (currentIndex === -1) {
    return;
  }
  const nextIndex = (currentIndex + 1) % workPagePaths.length;
  const nextPath = workPagePaths[nextIndex];
  return getPageForPath(nextPath, content);
};

export const getComponentsForPath = (
  path: string | string[],
  content: Content = defaultContent
): Component[] => {
  const normalisedPath = normalisePath(path);
  const page = getPageForPath(normalisedPath, content);
  // TODO: apply filtering to all
  const after = content.all.after.filter((pageComponent) => {
    if (pageComponent.exclude) {
      if (pageComponent.exclude.includes(normalisedPath)) {
        return false;
      }
    }
    return true;
  });
  return [...content.all.before, ...page.components, ...after];
};

export const getPropertiesForImage = (src: string): ImageProperties => {
  const properties = imageProperties[src];
  if (!properties) {
    console.warn(`getPropertiesForImage(${src}) - not found`, src);
    return { width: 42, height: 42 };
  }
  return properties;
};
