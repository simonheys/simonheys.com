import * as React from "react";
import { ChevronDown, FullScreen } from "../../ui/icons";

import DefaultControlsItem from "./DefaultControlsItem";
import LinkA from "../../ui/LinkA";

import styles from "./DefaultControls.module.scss";

const DefaultControls = ({
  title,
  source,
  download,
  wordsOpen,
  onToggleWordsOpen,
  onFullscreen,
}) => {
  return (
    <div className={styles.container}>
      {title && (
        <DefaultControlsItem tag={LinkA} href="/wordclock">
          Word Clock
        </DefaultControlsItem>
      )}
      <DefaultControlsItem onClick={onToggleWordsOpen} active={wordsOpen}>
        Words <ChevronDown />
      </DefaultControlsItem>
      {download && (
        <DefaultControlsItem
          tag={"a"}
          href="https://github.com/simonheys/wordclock/releases"
          target="_blank"
          rel="noreferrer"
        >
          Download
        </DefaultControlsItem>
      )}
      {source && (
        <DefaultControlsItem
          tag={"a"}
          href="https://github.com/simonheys/wordclock"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </DefaultControlsItem>
      )}
      <DefaultControlsItem
        onClick={onFullscreen}
        className={styles.fullscreenButton}
      >
        <FullScreen />
      </DefaultControlsItem>
    </div>
  );
};

export default DefaultControls;
