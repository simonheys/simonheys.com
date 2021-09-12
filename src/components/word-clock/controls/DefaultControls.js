import * as React from "react";
import { ChevronDown, FullScreen } from "../../ui/icons";

import DefaultControlsItem from "./DefaultControlsItem";

import styles from "./DefaultControls.module.scss";

const DefaultControls = ({ wordsOpen, onToggleWordsOpen, onFullscreen }) => {
  return (
    <div className={styles.container}>
      <DefaultControlsItem disabled>
        <div className={styles.title}>Word Clock</div>
      </DefaultControlsItem>
      <DefaultControlsItem onClick={onToggleWordsOpen} active={wordsOpen}>
        Words <ChevronDown />
      </DefaultControlsItem>
      <DefaultControlsItem
        tag={"a"}
        href="https://github.com/simonheys/wordclock/releases"
        target="_blank"
        rel="noreferrer"
      >
        Download
      </DefaultControlsItem>
      <DefaultControlsItem
        tag={"a"}
        href="https://github.com/simonheys/wordclock"
        target="_blank"
        rel="noreferrer"
      >
        Source
      </DefaultControlsItem>
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
