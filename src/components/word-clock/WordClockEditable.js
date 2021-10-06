import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";

import { WordClock } from "wordclock/packages/wordclock-js/dist";

import useFullscreen from "../../hooks/useFullscreen";
import useClickOutside from "../../hooks/useClickOutside";
import useBoundingClientRect from "../../hooks/useBoundingClientRect";
import isTouchDevice from "../../utils/isTouchDevice";

import DefaultControls from "./controls/DefaultControls";
import WordsPickerControls from "./controls/WordsPickerControls";
import fetcher from "./utils/fetcher";

import styles from "./WordClockEditable.module.scss";

const fileDefault = "English_simple_fragmented.json";
const wordsDefault = require(`wordclock/packages/wordclock-words/json/${fileDefault}`);

const WordClockEditable = ({
  file: fileProp = fileDefault,
  editable = true,
  title = false,
  download = true,
  source = true,
}) => {
  const [file, setFile] = React.useState(fileProp);
  const [wordsPickerControlsVisible, setWordsPickerControlsVisible] =
    React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(false);

  const {
    ref: fullscreenRef,
    isFullscreen,
    requestFullscreen,
  } = useFullscreen();

  const {
    ref: boundingClientRectRef,
    useRef: useBoundingClientRectRef,
    boundingClientRect,
  } = useBoundingClientRect();

  const onClick = React.useCallback(
    (event) => {
      if (useBoundingClientRectRef.current?.contains(event.target)) {
        if (wordsPickerControlsVisible) {
          setWordsPickerControlsVisible(false);
        }
        return;
      }
      if (isTouchDevice()) {
        return;
      }
      event.preventDefault();
      if (!controlsVisible && !isFullscreen) {
        setControlsVisible(true);
      }
      if (wordsPickerControlsVisible) {
        setWordsPickerControlsVisible(false);
      } else {
        if (controlsVisible) {
          setControlsVisible(false);
        }
      }
    },
    [
      controlsVisible,
      isFullscreen,
      useBoundingClientRectRef,
      wordsPickerControlsVisible,
    ]
  );
  const onClickOutside = React.useCallback(
    (event) => {
      if (isTouchDevice()) {
        return;
      }
      event.preventDefault();
      if (wordsPickerControlsVisible) {
        setWordsPickerControlsVisible(false);
        setControlsVisible(false);
      }
    },
    [wordsPickerControlsVisible]
  );
  const { ref: clickRef } = useClickOutside(onClickOutside);

  const { data: wordsCollection } = useSWR("/api/words", fetcher);
  const { data: words } = useSWR(`/api/words/${file}`, {
    fallbackData: wordsDefault,
  });

  const onToggleWordsOpen = React.useCallback(
    (e) => {
      e.stopPropagation();
      setWordsPickerControlsVisible(!wordsPickerControlsVisible);
    },
    [wordsPickerControlsVisible]
  );

  const onMouseEnter = React.useCallback(() => {
    if (isFullscreen) {
      return;
    }
    if (isTouchDevice()) {
      return;
    }
    setControlsVisible(true);
  }, [isFullscreen]);

  const onMouseLeave = React.useCallback(() => {
    if (wordsPickerControlsVisible) {
      return;
    }
    setControlsVisible(false);
  }, [wordsPickerControlsVisible]);

  React.useEffect(() => {
    if (isFullscreen) {
      setControlsVisible(false);
      setWordsPickerControlsVisible(false);
    }
  }, [isFullscreen]);

  const style = React.useMemo(() => {
    if (!boundingClientRect.width) {
      return null;
    }
    return {
      width: boundingClientRect.width >= 320 ? boundingClientRect.width : "95%",
    };
  }, [boundingClientRect.width]);

  if (!editable) {
    return (
      <div className={styles.containerSizer}>
        <div className={styles.wordClockContainer}>
          <WordClock words={words} />
        </div>
      </div>
    );
  }

  return (
    <div ref={clickRef} className={styles.containerSizer}>
      <div
        ref={fullscreenRef}
        className={
          isFullscreen
            ? styles.wordClockContainerFullscreen
            : styles.wordClockContainer
        }
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <WordClock words={words} />
        <div className={styles.controlsContainer}>
          <AnimatePresence>
            {wordsPickerControlsVisible && (
              <motion.div
                key={`wordsPickerControlsContainer`}
                className={styles.wordsPickerControlsContainer}
                exit={{ opacity: 0, y: 20, scale: 0.975 }}
                initial={{ opacity: 0, y: 20, scale: 0.975 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                style={style}
              >
                <WordsPickerControls
                  wordsCollection={wordsCollection}
                  file={file}
                  setFile={setFile}
                />
              </motion.div>
            )}
            {controlsVisible && (
              <motion.div
                key={`defaultControlsContainer`}
                className={styles.defaultControlsContainer}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                ref={boundingClientRectRef}
              >
                <DefaultControls
                  title={title}
                  download={download}
                  source={source}
                  onFullscreen={requestFullscreen}
                  onToggleWordsOpen={onToggleWordsOpen}
                  wordsOpen={wordsPickerControlsVisible}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WordClockEditable;
