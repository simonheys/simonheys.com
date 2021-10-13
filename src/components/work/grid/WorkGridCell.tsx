import * as React from "react";
import { motion } from "framer-motion";

import * as contentModule from "../../../modules/content";
import LinkA from "../../ui/LinkA";
import ImageFadeIn from "../../ui/ImageFadeIn";

import styles from "./WorkGridCell.module.scss";

const WorkGridCell = ({ page }: { page: contentModule.Page }) => {
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

export default WorkGridCell;
