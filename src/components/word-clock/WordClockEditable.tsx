import { AnimatePresence, motion } from 'framer-motion';
import {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  MouseEvent as ReactMouseEvent,
} from 'react';
import useSWR from 'swr';
import { WordClock } from 'wordclock/packages/wordclock-js';
import 'wordclock/packages/wordclock-js/dist/style.css';

import useBoundingClientRect from '../../hooks/useBoundingClientRect';
import useClickOutside from '../../hooks/useClickOutside';
import useFullscreen from '../../hooks/useFullscreen';
import isTouchDevice from '../../utils/isTouchDevice';
import styles from './WordClockEditable.module.scss';
import DefaultControls from './controls/DefaultControls';
import WordsPickerControls from './controls/WordsPickerControls';
import fetcher from './utils/fetcher';

const fileDefault = 'English_simple_fragmented.json';
const wordsDefault = require(`wordclock/packages/wordclock-words/json/${fileDefault}`);

export interface WordClockEditableProps {
  file: string;
  editable: boolean;
  title: boolean;
  download: boolean;
  source: boolean;
}

const WordClockEditable: FC<WordClockEditableProps> = ({
  file: fileProp = fileDefault,
  editable = true,
  title = false,
  download = true,
  source = true,
}) => {
  const [file, setFile] = useState(fileProp);
  const [wordsPickerControlsVisible, setWordsPickerControlsVisible] =
    useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

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

  const onClick = useCallback(
    (event: ReactMouseEvent) => {
      if (useBoundingClientRectRef.current?.contains(event.target as Node)) {
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
    ],
  );
  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isTouchDevice()) {
        return;
      }
      event.preventDefault();
      if (wordsPickerControlsVisible) {
        setWordsPickerControlsVisible(false);
        setControlsVisible(false);
      }
    },
    [wordsPickerControlsVisible],
  );
  const { ref: clickRef } = useClickOutside(onClickOutside);

  const { data: wordsCollection } = useSWR('/api/words', fetcher);
  const { data: words } = useSWR(`/api/words/${file}`, fetcher);

  const onToggleWordsOpen = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setWordsPickerControlsVisible(!wordsPickerControlsVisible);
    },
    [wordsPickerControlsVisible],
  );

  const onMouseEnter = useCallback(() => {
    if (isFullscreen) {
      return;
    }
    if (isTouchDevice()) {
      return;
    }
    setControlsVisible(true);
  }, [isFullscreen]);

  const onMouseLeave = useCallback(() => {
    if (wordsPickerControlsVisible) {
      return;
    }
    setControlsVisible(false);
  }, [wordsPickerControlsVisible]);

  useEffect(() => {
    if (isFullscreen) {
      setControlsVisible(false);
      setWordsPickerControlsVisible(false);
    }
  }, [isFullscreen]);

  const style = useMemo(() => {
    if (!boundingClientRect?.width) {
      return;
    }
    return {
      width: boundingClientRect.width >= 320 ? boundingClientRect.width : '95%',
    };
  }, [boundingClientRect?.width]);

  if (!editable) {
    return (
      <div className={styles.containerSizer}>
        <div className={styles.wordClockContainer}>
          <WordClock words={words || wordsDefault} />
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
                transition={{ duration: 0.3, type: 'spring' }}
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
