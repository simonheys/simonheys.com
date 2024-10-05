import { FC, Fragment, useCallback, useEffect, useMemo, useRef } from "react";

import preventWindowScroll from "../../../utils/preventWindowScroll";
import { Circle } from "../../ui/icons";

import styles from "./WordsPickerControls.module.scss";

export interface WordsPickerControlsProps {
  wordsCollection: {
    [x: string]: {
      file: string;
      title: string;
    }[];
  };
  file: string;
  setFile: (file: string) => void;
}

const WordsPickerControls: FC<WordsPickerControlsProps> = ({
  wordsCollection = [],
  file: selectedFile,
  setFile,
}) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = useCallback(() => {
    preventWindowScroll(() => {
      selectedRef?.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    });
  }, []);

  const setSelectedRef = useCallback(
    (ref: HTMLDivElement) => {
      selectedRef.current = ref;
      scrollIntoView();
    },
    [scrollIntoView],
  );

  useEffect(() => {
    const timeoutId = setTimeout(scrollIntoView, 0);
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [scrollIntoView]);

  const wordsCollectionEntries = useMemo(() => {
    return Object.entries(wordsCollection);
  }, [wordsCollection]);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        {/* <div className={styles.wordsCollectionContainer}></div> */}
        <div className={styles.wordsCollectionContainer}>
          {wordsCollectionEntries.map(([language, entries], index) => {
            return (
              <Fragment key={index}>
                <div className={styles.wordsCollectionLanguage}>{language}</div>
                <div className={styles.wordsCollectionFileGroup}>
                  {entries.map(({ file, title }, index: number) => {
                    const selected = file === selectedFile;
                    return (
                      <div
                        key={index}
                        className={styles.wordsCollectionFileGroupCell}
                      >
                        <div
                          className={
                            selected
                              ? styles.wordsCollectionFileSelected
                              : styles.wordsCollectionFile
                          }
                          onClick={() => setFile(file)}
                          ref={selected ? setSelectedRef : null}
                        >
                          <div className={styles.wordsCollectionFileIcon}>
                            <Circle />
                          </div>
                          <div className={styles.wordsCollectionFileTitle}>
                            {title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordsPickerControls;
