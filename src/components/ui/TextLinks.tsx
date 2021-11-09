import * as React from "react";

import { ChevronRight } from "./icons";
import LinkA from "./LinkA";

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
        return (
          <LinkA key={index} className={styles.link} href={url}>
            {text}
            <span className={styles.linkIcon}>
              <ChevronRight />
            </span>
          </LinkA>
        );
      })}
    </div>
  );
};

export default TextLinks;
