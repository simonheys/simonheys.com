import * as React from "react";

import { Page } from "../../../modules/content";
import { ChevronRight } from "../../ui/icons";
import ImageFadeIn from "../../ui/ImageFadeIn";
import LinkA from "../../ui/LinkA";

import styles from "./CaseStudiesGridCell.module.scss";

export interface CaseStudiesGridCellProps {
  page: Page;
}

const CaseStudiesGridCell: React.FC<CaseStudiesGridCellProps> = ({ page }) => {
  const { path, meta } = page;
  const { title, subtitle, text, icon } = meta;
  return (
    <LinkA href={path} className={styles.container}>
      <div className={styles.icon}>
        <ImageFadeIn src={icon} alt={title} backgroundColor={"transparent"} />
      </div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.text}>{text}</div>
      <div className={styles.link}>
        Read more <ChevronRight />
      </div>
    </LinkA>
  );
};

export default CaseStudiesGridCell;
