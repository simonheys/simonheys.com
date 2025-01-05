'use client';

import {
  WordClock,
  WordClockContent,
  WordClockWordProps,
} from '@simonheys/wordclock';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';

import useBoundingClientRect from '../../hooks/useBoundingClientRect';
import useClickOutside from '../../hooks/useClickOutside';
import useFullscreen from '../../hooks/useFullscreen';
import isTouchDevice from '../../utils/isTouchDevice';

import DefaultControls from './controls/DefaultControls';
import WordsPickerControls from './controls/WordsPickerControls';
import fetcher from './utils/fetcher';

import { cn } from '@/utils/cn';

const MotionWordsPickerControls = motion.create(WordsPickerControls);
const MotionDefaultControls = motion.create(DefaultControls);

const fileDefault = 'English_simple_fragmented.json';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const wordsDefault = require(`@simonheys/wordclock-words/json/${fileDefault}`);

export interface WordClockEditableProps {
  file: string;
  editable: boolean;
  title: boolean;
  download: boolean;
  source: boolean;
}

const WordClockWord: FC<WordClockWordProps> = ({ highlighted, children }) => {
  return (
    <span
      className={cn(
        highlighted ? 'text-primary' : 'text-gray-400',
        'me-[0.2em] transition-colors duration-150 ease-in-out',
      )}
    >
      {children}
    </span>
  );
};

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
    (e: ReactMouseEvent) => {
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
      <div className="relative flex h-full">
        <div className="absolute inset-0 select-none bg-background [font-feature-settings:'liga'_1,'kern'_1]">
          <WordClock words={words || wordsDefault}>
            <WordClockContent wordComponent={WordClockWord} />
          </WordClock>
        </div>
      </div>
    );
  }

  return (
    <div ref={clickRef} className="relative flex h-full">
      <motion.div
        ref={fullscreenRef}
        className={cn(
          "absolute inset-0 select-none bg-background [font-feature-settings:'liga'_1,'kern'_1]",
          isFullscreen && 'p-3',
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <WordClock words={words} className="font-bold leading-none">
          <WordClockContent wordComponent={WordClockWord} />
        </WordClock>
        <div className="absolute inset-0 hidden flex-col items-center overflow-hidden md:flex">
          <AnimatePresence>
            {wordsPickerControlsVisible && (
              <MotionWordsPickerControls
                key="wordsPickerControlsContainer"
                className="mb-2"
                exit={{ opacity: 0, y: 20, scale: 0.975 }}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.975,
                  width: style?.width,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  width: style?.width,
                }}
                transition={{ duration: 0.3, type: 'spring' }}
                wordsCollection={wordsCollection}
                file={file}
                setFile={setFile}
              />
            )}
            {controlsVisible && (
              <MotionDefaultControls
                key="defaultControlsContainer"
                className="mb-4 mt-auto"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                ref={boundingClientRectRef}
                title={title}
                download={download}
                source={source}
                onFullscreen={requestFullscreen}
                onToggleWordsOpen={onToggleWordsOpen}
                wordsOpen={wordsPickerControlsVisible}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default WordClockEditable;
