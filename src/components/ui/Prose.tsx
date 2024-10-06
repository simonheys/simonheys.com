import { LinkProps } from "next/link";
import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";

import AppearWhenInView from "./AppearWhenInView";
import ImageResponsive from "./ImageResponsive";
import Link from "./Link";
import styles from "./Prose.module.scss";
import TextLinks from "./TextLinks";

export interface ProseProps {
  title?: string;
  text?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
}

const LinkComponent = ({
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href as LinkProps["href"]}
      className="text-primary transition duration-100 hover:text-primary-hover"
      {...rest}
    />
  );
};

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <ImageResponsive
      src={src as string}
      alt={alt as string}
      width={width as number}
      height={height as number}
      {...rest}
    />
  );
};

export const reactMarkdownComponents: Partial<Components> = {
  a: LinkComponent,
  img: ImageComponent,
};

const Prose: FC<ProseProps> = ({ title, text, links, ruled }) => {
  return (
    <AppearWhenInView>
      {ruled && (
        <div className="container-fluid">
          <div className="row gx-0 border-top"></div>
        </div>
      )}
      <div className={ruled ? "container-fluid mb-5 pt-2" : "container-fluid"}>
        <div className="row mb-5">
          <div className="col-md-6">
            {title && <h1 className={styles.title}>{title}</h1>}
          </div>
          <div className="col-md-6">
            {text && (
              <div className={styles.text}>
                <ReactMarkdown components={reactMarkdownComponents}>
                  {text}
                </ReactMarkdown>
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
