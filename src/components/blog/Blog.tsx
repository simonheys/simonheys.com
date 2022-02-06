import * as React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

import styles from "./Blog.module.scss";
import ImageResponsive from "../ui/ImageResponsive";
import { getBlogDateFromPath, getPageForPath } from "../../modules/content";

const LinkComponent = ({ href, ...rest }: any) => {
  return <LinkA href={href} {...rest} />;
};

const ImageComponent = ({ node, ...rest }: any) => {
  return <ImageResponsive {...rest} />;
};

const components = {
  a: LinkComponent,
  img: ImageComponent,
  // code: CodeBlock,
};

export interface BlogProps {
  content: string;
}

const Prose: React.FC<BlogProps> = ({ content }) => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
  const date = getBlogDateFromPath(router.asPath);
  const age = new Date().getFullYear() - date.getFullYear();
  const old = age >= 5;
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        {old && (
          <div className={"col-md-12"}>
            This content is more than 5 years old and probably doesn't work any
            more
          </div>
        )}
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
