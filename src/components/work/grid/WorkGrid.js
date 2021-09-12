import * as React from "react";
import { motion } from "framer-motion";

import * as contentModule from "../../../modules/content";
import AppearWhenInView from "../../ui/AppearWhenInView";
import LinkA from "../../ui/LinkA";
import ImageFadeIn from "../../ui/ImageFadeIn";

import styles from "./WorkGrid.module.scss";

export const WorkGridCell = ({ page }) => {
  const { path, title, subtitle, thumbnails } = page;
  if (!thumbnails) {
    return null;
  }
  const src = thumbnails[0].src;
  return (
    <LinkA href={path} className={styles.containerLink}>
      <div className={styles.containerSizer}>
        <motion.div
          key={`work-grid-cell-${path}`}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
          className={styles.container}
        >
          <ImageFadeIn src={src} alt={title} />
        </motion.div>
      </div>
      <div className={styles.caption}>
        <span className={styles.title}>{title}</span>{" "}
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </LinkA>
  );
};

const WorkGrid = () => {
  const pages = contentModule.getMeta().work.pages;
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      <div className={"row"}>
        {pages.map((entry, index) => {
          const { path } = entry;
          const page = contentModule.getPageForPath(path);
          if (!page) {
            return null;
          }
          return (
            <AppearWhenInView
              key={`work-grid-${path}-${index}`}
              className={"col-md-6 mb-3 mb-md-4"}
            >
              <WorkGridCell page={page} />
            </AppearWhenInView>
          );
        })}
      </div>
    </div>
  );
};

export default WorkGrid;
