import * as React from "react";
import Sticky from "react-stickynode";

import {
  getBlogDateFromPath,
  getBlogPagePaths,
  getPageForPath,
} from "../../modules/content";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

import styles from "./BlogIndex.module.scss";

const BlogIndex: React.FC = () => {
  const pagePaths = getBlogPagePaths();
  const pagesPathsByYear = {};

  pagePaths.forEach((path) => {
    const date = getBlogDateFromPath(path);
    const year = date.getFullYear();
    if (!pagesPathsByYear[year]) {
      pagesPathsByYear[year] = [];
    }
    pagesPathsByYear[year].push(path);
  });

  const sortedYears = Object.keys(pagesPathsByYear).sort().reverse();

  return (
    <>
      {sortedYears.map((year, index) => {
        const paths = pagesPathsByYear[year];
        const currentId = `year${index}`;
        const nextId = `year${index + 1}`;
        return (
          <div key={`year-${year}`}>
            <div className={"container-fluid"}>
              <AppearWhenInView>
                <div id={currentId} className={"row gx-0 border-top"}></div>
              </AppearWhenInView>
            </div>
            <div className={"container-fluid"}>
              <div className={"row"}>
                <div className={"col-md-3"}>
                  <Sticky bottomBoundary={`#${nextId}`}>
                    <AppearWhenInView>
                      <div className={styles.date}>{year}</div>
                    </AppearWhenInView>
                  </Sticky>
                </div>
                <div className={"col-md-6 pt-0 pt-sm-2"}>
                  {paths.map((path, index) => {
                    const page = getPageForPath(path);
                    if (!page) {
                      return null;
                    }
                    return (
                      <AppearWhenInView
                        key={`blog-entry-${index}`}
                        className={"mb-3 mb-md-4 d-flex flex-column"}
                      >
                        <LinkA href={path}>
                          <div>
                            <div className={styles.entryTitle}>
                              {page.title}
                            </div>
                            <div className={styles.excerpt}>
                              <p>{page.excerpt}</p>
                            </div>
                          </div>
                        </LinkA>
                      </AppearWhenInView>
                    );
                  })}
                  <div className={"col-md-3"}></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogIndex;
