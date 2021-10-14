import * as React from "react";
import { ChevronDown } from "../ui/icons";

import WordClockEditable, { WordClockEditableProps } from "./WordClockEditable";
import useWindowSize from "../../hooks/useWindowSize";

import styles from "./WordClockFill.module.scss";

const WordClockFill: React.FC<WordClockEditableProps> = (props) => {
  const windowSize = useWindowSize();
  const onChevronClick = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const html = document.getElementsByTagName("html")[0];
      html.style.setProperty("scroll-behavior", "smooth");
      window.scrollTo(window.scrollX, windowSize.innerHeight - 16);
      html.style.removeProperty("scroll-behavior");
    }
  }, [windowSize.innerHeight]);
  return (
    <div className={styles.container}>
      <div className={"row h-100 mb-md-5"}>
        <div className={"col h-100"}>
          <WordClockEditable {...props} />
        </div>
      </div>
      <div className={styles.chevronContainer}>
        <div className={styles.chevron}>
          <ChevronDown onClick={onChevronClick} />
        </div>
      </div>
    </div>
  );
};

export default WordClockFill;
