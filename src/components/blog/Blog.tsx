import * as React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import AppearWhenInView from "../ui/AppearWhenInView";
import LinkA from "../ui/LinkA";

import styles from "./Blog.module.scss";
import ImageResponsive from "../ui/ImageResponsive";
import { getBlogDateFromPath, getPageForPath } from "../../modules/content";

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={dracula}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

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
