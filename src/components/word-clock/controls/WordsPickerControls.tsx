import * as React from "react";

import preventWindowScroll from "../../../utils/preventWindowScroll";
import { Circle } from "../../ui/icons";

import styles from "./WordsPickerControls.module.scss";

const WordsPickerControls = ({
  wordsCollection = [],
  file: selectedFile,
  setFile,
}) => {
  const selectedRef = React.useRef(null);

  const scrollIntoView = React.useCallback(() => {
    preventWindowScroll(() => {
      selectedRef?.current?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    });
  }, []);

  const setSeletedRef = React.useCallback(
    (ref) => {
      selectedRef.current = ref;
      scrollIntoView();
    },
    [scrollIntoView]
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(scrollIntoView, 0);
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [scrollIntoView]);

  const wordsCollectionEntries = React.useMemo(() => {
    return Object.entries(wordsCollection);
  }, [wordsCollection]);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        {/* <div className={styles.wordsCollectionContainer}></div> */}
        <div className={styles.wordsCollectionContainer}>
          {wordsCollectionEntries.map(([language, entries], index) => {
            return (
              <React.Fragment key={index}>
                <div className={styles.wordsCollectionLanguage}>{language}</div>
                <div className={styles.wordsCollectionFileGroup}>
                  {entries.map(({ file, title }, index) => {
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
                          ref={selected ? setSeletedRef : null}
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
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordsPickerControls;
