import * as React from "react";
import { ChevronDown } from "../ui/icons";

import AppearWhenInView from "../ui/AppearWhenInView";
import WordClockEditable, { WordClockEditableProps } from "./WordClockEditable";
import useWindowSize from "../../hooks/useWindowSize";
import useWindowScroll from "../../hooks/useWindowScroll";

import styles from "./WordClockFill.module.scss";

const WordClockFill: React.FC<WordClockEditableProps> = (props) => {
  const windowSize = useWindowSize();
  const windowScroll = useWindowScroll();

  const onChevronClick = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const html = document.getElementsByTagName("html")[0];
      html.style.setProperty("scroll-behavior", "smooth");
      window.scrollTo(window.scrollX, windowSize.innerHeight - 16);
      html.style.removeProperty("scroll-behavior");
    }
  }, [windowSize.innerHeight]);

  const chevronVisible = windowScroll.scrollY < 16;

  return (
    <div className={styles.container}>
      <div className={"row h-100 mb-md-5"}>
        <div className={"col h-100"}>
          <WordClockEditable {...props} />
        </div>
      </div>
      <div className={styles.chevronContainer}>
        <AppearWhenInView>
          <div
            className={chevronVisible ? styles.chevron : styles.chevronHidden}
          >
            <ChevronDown onClick={onChevronClick} />
          </div>
        </AppearWhenInView>
      </div>
    </div>
  );
};

export default WordClockFill;
