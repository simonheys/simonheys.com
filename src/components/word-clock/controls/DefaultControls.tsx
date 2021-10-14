import * as React from "react";
import { ChevronDown, FullScreen } from "../../ui/icons";

import DefaultControlsItem from "./DefaultControlsItem";
import LinkA from "../../ui/LinkA";

import styles from "./DefaultControls.module.scss";

export interface DefaultControlsProps {
  title: boolean;
  source: boolean;
  download: boolean;
  wordsOpen: boolean;
  onToggleWordsOpen: (event: MouseEvent) => void;
  onFullscreen: (event: MouseEvent) => void;
}

const DefaultControls: React.FC<DefaultControlsProps> = ({
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
        <DefaultControlsItem Tag={LinkA} href="/wordclock">
          Word Clock
        </DefaultControlsItem>
      )}
      <DefaultControlsItem onClick={onToggleWordsOpen} active={wordsOpen}>
        Words <ChevronDown />
      </DefaultControlsItem>
      {download && (
        <DefaultControlsItem
          Tag={"a"}
          href="https://github.com/simonheys/wordclock/releases"
          target="_blank"
          rel="noreferrer"
        >
          Download
        </DefaultControlsItem>
      )}
      {source && (
        <DefaultControlsItem
          Tag={"a"}
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
