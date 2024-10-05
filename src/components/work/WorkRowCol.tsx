import { ComponentProps, FC } from "react";
import ReactMarkdown from "react-markdown";

import { ComponentKey, MappedComponent } from "../Components";
import ImageFadeIn from "../ui/ImageFadeIn";
import TextLinks from "../ui/TextLinks";
import VideoFadeIn from "../ui/VideoFadeIn";

import styles from "./WorkRowCol.module.scss";

export interface WorkRowColProps
  extends Omit<ComponentProps<typeof MappedComponent>, "type"> {
  type?: ComponentKey;
  col?: number | string;
  text?: string;
  links?: { text: string; url: string }[];
  src?: string;
  youTubeId?: string;
  vimeoId?: string;
  color?: string;
  title?: string;
  aspect?: string;
}

const WorkRowCol: FC<WorkRowColProps> = ({ type, col, ...rest }) => {
  const className = col
    ? `${styles.container} col-sm-${col}`
    : `${styles.container} col-sm`;

  if (type) {
    return (
      <div className={className}>
        <MappedComponent type={type} {...{ col }} {...rest} />
      </div>
    );
  }

  const {
    text,
    links,
    src,
    youTubeId,
    vimeoId,
    color,
    title = "",
    aspect,
  } = rest;

  if (text) {
    return (
      <>
        <div className="col-md-6"></div>
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
      </>
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
            aspect={aspect}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default WorkRowCol;
