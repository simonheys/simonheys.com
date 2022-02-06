import * as React from "react";

import { getBlogPagePaths, getPageForPath } from "../../modules/content";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

const BlogIndex: React.FC = () => {
  const pagePaths = getBlogPagePaths();
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      {pagePaths.map((path, index) => {
        const page = getPageForPath(path);
        if (!page) {
          return null;
        }
        return (
          <AppearWhenInView
            key={`case-studies-grid-${path}-${index}`}
            className={"col-md mb-3 mb-md-4 d-flex flex-column"}
          >
            <LinkA href={path}>
              <div className={"row"}>{JSON.stringify(page, null, 2)}</div>
            </LinkA>
          </AppearWhenInView>
        );
      })}
    </div>
  );
};

export default BlogIndex;
