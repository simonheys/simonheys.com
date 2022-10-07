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
import {
  getBlogDateFromPath,
  content as defaultContent,
  getPageForPath,
} from "../../modules/content";
import { Circle, Slash } from "../ui/icons";
import TextLinks from "../ui/TextLinks";

const LinkComponent: React.FC<any> = ({ href, ...rest }) => {
  return <LinkA href={href} {...rest} />;
};

const ImageComponent: React.FC<any> = ({ node, ...rest }) => {
  return <ImageResponsive {...rest} />;
};

const customStyle = {
  margin: 0,
  borderRadius: "0.2rem",
};

const codeTagProps = {
  className: styles.syntaxHighlighterCode,
};

const CodeBlock: React.FC<any> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      codeTagProps={codeTagProps}
      customStyle={customStyle}
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

const components = {
  a: LinkComponent,
  img: ImageComponent,
  code: CodeBlock,
};

export interface BlogProps {
  content: string;
}

const Blog: React.FC<BlogProps> = ({ content }) => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
  const date = getBlogDateFromPath(router.asPath);
  const age = new Date().getFullYear() - date.getFullYear();
  const old = age >= 5;
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const dateTime = `${year}-${month}-${day}`;
  return (
    <>
      <AppearWhenInView>
        <div className={"container-fluid"}>
          <div className={"row gx-0 border-top"}></div>
        </div>
        <div className={"container-fluid pt-2"}>
          <div className={"row mb-5"}>
            <div className={"col-md-3"}>
              <h1 className={styles.date}>
                <time itemProp="datePublished" dateTime={dateTime}>
                  {day}
                  <Slash />
                  {month}
                  <Slash />
                  {year}
                </time>
              </h1>
            </div>
            <div className={"col-md-6"}>
              <h1 className={styles.title}>{page.title}</h1>
              {old && (
                <div className={styles.warning}>
                  <Circle /> This content is more than {age - 1} years old
                </div>
              )}
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
      <AppearWhenInView>
        <div className={"container-fluid"}>
          <div className={"row gx-0 border-top"}></div>
        </div>
        <div className={"container-fluid pt-2"}>
          <div className={"row mb-5"}>
            <div className={"col-md-3"}>
              <h1 className={styles.date}>
                {defaultContent.all.after[0].title}
              </h1>
            </div>
            <div className={"col-md-6"}>
              <div className={styles.text}>
                <p>{defaultContent.all.after[0].subtitle}</p>
                <p>
                  <TextLinks links={defaultContent.all.after[0].links} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppearWhenInView>
    </>
  );
};

export default Blog;
