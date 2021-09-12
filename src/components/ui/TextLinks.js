import * as React from "react";

import { ChevronRight } from "./icons";

import styles from "./TextLinks.module.scss";

const TextLinks = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }
  return (
    <div className={styles.container}>
      {links.map(({ text, url }, index) => {
        return (
          <a
            key={index}
            className={styles.link}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {text}
            <span className={styles.linkIcon}>
              <ChevronRight />
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default TextLinks;
