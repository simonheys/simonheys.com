import * as React from "react";
import ReactMarkdown from "react-markdown";

import AppearWhenInView from "./AppearWhenInView";
import TextLinks from "./TextLinks";
import LinkA from "./LinkA";

import styles from "./Prose.module.scss";

export interface ProseProps {
  title?: string;
  text?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
}

const LinkComponent = ({ href, ...rest }: any) => {
  return <LinkA href={href} {...rest} />;
};

const components = {
  a: LinkComponent,
};

const Prose: React.FC<ProseProps> = ({ title, text, links, ruled }) => {
  return (
    <AppearWhenInView>
      {ruled && (
        <div className={"container-fluid"}>
          <div className={"row gx-0 border-top"}></div>
        </div>
      )}
      <div className={ruled ? "container-fluid pt-2 mb-5" : "container-fluid"}>
        <div className={"row mb-5"}>
          <div className={"col-md-6"}>
            {title && <h1 className={styles.title}>{title}</h1>}
          </div>
          <div className={"col-md-6"}>
            {text && (
              <div className={styles.text}>
                <ReactMarkdown components={components}>{text}</ReactMarkdown>
              </div>
            )}
            {links && (
              <div className={styles.links}>
                <TextLinks links={links} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Prose;
