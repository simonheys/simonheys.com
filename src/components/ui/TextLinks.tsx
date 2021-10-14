import * as React from "react";

import { ChevronRight } from "./icons";

import styles from "./TextLinks.module.scss";

export interface TextLinksProps {
  links: {
    text: string;
    url: string;
  }[];
}

const TextLinks: React.FC<TextLinksProps> = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }
  return (
    <div className={styles.container}>
      {links.map(({ text, url }, index) => {
        const isInternal = url.startsWith("/");
        return (
          <a
            key={index}
            className={styles.link}
            href={url}
            target={isInternal ? null : "_blank"}
            rel={isInternal ? null : "noreferrer"}
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
