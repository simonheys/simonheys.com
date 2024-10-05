import { FC } from "react";

import { ChevronRight } from "./icons";
import Link from "./Link";
import styles from "./TextLinks.module.scss";

export interface TextLinksProps {
  links: {
    text: string;
    url: string;
  }[];
}

const TextLinks: FC<TextLinksProps> = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }
  return (
    <div className={styles.container}>
      {links.map(({ text, url }, index) => {
        return (
          <Link key={index} className={styles.link} href={url}>
            {text}
            <span className={styles.linkIcon}>
              <ChevronRight />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default TextLinks;
