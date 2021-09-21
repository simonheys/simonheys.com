import * as React from "react";
import WordClockEditable from "./WordClockEditable";

import styles from "./WordClockFill.module.scss";

const WordClockFill = (props) => {
  return (
    <div className={styles.container}>
      <div className={"row h-100 mb-md-5"}>
        <div className={"col h-100"}>
          <WordClockEditable {...props} />
        </div>
      </div>
    </div>
  );
};

export default WordClockFill;
