import * as React from "react";
import { useRouter } from "next/router";

import {
  getBlogDateFromPath,
  getBlogPagePaths,
  getPageForPath,
} from "../../modules/content";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

import styles from "./BlogIndex.module.scss";

const BlogIndex: React.FC = () => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
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
      {sortedYears.map((year) => {
        const paths = pagesPathsByYear[year];
        return (
          <div key={year}>
            <div className={"container-fluid"}>
              <AppearWhenInView>
                <div className={"row gx-0 border-top"}></div>
              </AppearWhenInView>
            </div>
            <div className={"container-fluid pt-2"}>
              <div className={"row"}>
                <div className={"col-md-3"}>
                  <AppearWhenInView>
                    <h1 className={styles.title}>{year}</h1>
                  </AppearWhenInView>
                </div>
                <div className={"col-md-6"}>
                  {paths.map((path, index) => {
                    const page = getPageForPath(path);
                    if (!page) {
                      return null;
                    }
                    const date = getBlogDateFromPath(path);
                    return (
                      <AppearWhenInView
                        key={`index`}
                        className={"col-md mb-3 mb-md-4 d-flex flex-column"}
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
      <div className={"container-fluid pt-2 mb-5"}>
        <div className={"row"}>
          <div className={"col-md-6"}>
            <h1 className={styles.title}>{page.title}</h1>
          </div>
          <div className={"col-md-6"}>
            {pagePaths.map((path, index) => {
              const page = getPageForPath(path);
              if (!page) {
                return null;
              }
              const date = getBlogDateFromPath(path);
              return (
                <AppearWhenInView
                  key={`case-studies-grid-${path}-${index}`}
                  className={"col-md mb-3 mb-md-4 d-flex flex-column"}
                >
                  <LinkA href={path}>
                    <div>
                      <h2>
                        {page.title} {date.toLocaleDateString()}
                      </h2>
                      <p>{page.excerpt}</p>
                    </div>
                  </LinkA>
                </AppearWhenInView>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
