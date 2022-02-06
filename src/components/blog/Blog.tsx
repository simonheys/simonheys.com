import * as React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

import styles from "./Blog.module.scss";
import ImageResponsive from "../ui/ImageResponsive";
import { getBlogDateFromPath, getPageForPath } from "../../modules/content";

export interface BlogProps {
  content: string;
}

const LinkComponent = ({ href, ...rest }: any) => {
  return <LinkA href={href} {...rest} />;
};

const ImageComponent = ({ node, ...rest }: any) => {
  return <ImageResponsive {...rest} />;
};

const components = {
  a: LinkComponent,
  img: ImageComponent,
};

const Prose: React.FC<BlogProps> = ({ content }) => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
  const date = getBlogDateFromPath(router.asPath);
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        <div className={"row mb-5"}>
          <div className={"col-md-6"}>
            <h1 className={styles.title}>
              {page.title} {date.toLocaleDateString()}
            </h1>
          </div>
          <div className={"col-md-6"}>
            {content && (
              <div className={styles.text}>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={components}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Prose;
