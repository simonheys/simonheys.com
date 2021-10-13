import * as React from "react";
import ReactMarkdown from "react-markdown";

import { MappedComponent } from "../Components";
import ImageFadeIn from "../ui/ImageFadeIn";
import VideoFadeIn from "../ui/VideoFadeIn";
import TextLinks from "../ui/TextLinks";

import styles from "./WorkRowCol.module.scss";

export type WorkRowColProps = {
  type?: string;
  col?: number | string;
  text?: string;
  links?: { text: string; url: string }[];
  src?: string;
  youTubeId?: string;
  vimeoId?: string;
  color?: string;
  title?: string;
};

const WorkRowCol = ({ type, col, ...rest }: WorkRowColProps) => {
  const className = col
    ? `${styles.container} col-sm-${col}`
    : `${styles.container} col-sm`;

  if (type) {
    return (
      <div className={className}>
        <MappedComponent type={type} col={col} {...rest} />
      </div>
    );
  }

  const { text, links, src, youTubeId, vimeoId, color, title = "" } = rest;

  if (text) {
    return (
      <React.Fragment>
        <div className={"col-md-6"}></div>
        <div className={`${styles.container} col-md-6`}>
          <div className={styles.textContainer}>
            <div className={styles.text}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            {links && (
              <div className={styles.links}>
                <TextLinks links={links} />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (src) {
    return (
      <div className={className}>
        <div className={styles.inner}>
          <ImageFadeIn src={src} alt={title} />
        </div>
      </div>
    );
  }

  if (youTubeId || vimeoId) {
    return (
      <div className={className}>
        <div className={styles.inner}>
          <VideoFadeIn
            col={col}
            youTubeId={youTubeId}
            vimeoId={vimeoId}
            color={color}
            title={title}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default WorkRowCol;
