export const imageProperties = require("../../content/image-properties.json");
export const content = require("../../content/content.json");

export const getMeta = () => content.meta;

export const getPagePaths = () => content.pages.map((page) => page.path).sort();

export const getPageForPath = (path) => {
  const queryIndex = path.indexOf("?");
  if (queryIndex !== -1) {
    path = path.substr(0, queryIndex);
  }
  return content.pages.find((page) => page.path === path);
};

export const getPageIndexForPath = (path) =>
  content.pages.findIndex((page) => page.path === path);

export const getNextWorkPageForPath = (path) => {
  const workPages = content.meta.work.pages;
  const currentIndex = workPages.findIndex((page) => page.path === path);
  if (currentIndex === -1) {
    return 0;
  }
  const nextIndex = (currentIndex + 1) % workPages.length;
  const nextPath = workPages[nextIndex].path;
  return getPageForPath(nextPath);
};

export const getPageForSlug = (slug) => {
  const path = "/" + slug.join("/");
  return getPageForPath(path);
};

export const getPropertiesForImage = (src) => {
  const properties = imageProperties[src];
  if (!properties) {
    console.warn(`getPropertiesForImage(${src}) - not found`, src);
    return { width: 42, height: 42 };
  }
  return properties;
};

export const getComponentsForSlug = (slug) => {
  const page = getPageForSlug(slug);
  const path = "/" + slug.join("/");
  const pageComponents = page.components;
  let components = [];
  const onlyIndex = pageComponents.findIndex((page) => page.only);
  if (onlyIndex !== -1) {
    // include only first component with 'only' set to true
    components = [pageComponents[onlyIndex]];
  } else {
    // omit components with 'exclude' set to true
    components = pageComponents.filter((page) => page.exclude !== true);
  }
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
  return [...content.all.before, ...components, ...after];
};
