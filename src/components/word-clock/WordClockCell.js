import * as React from "react";

import WordClockEditable from "./WordClockEditable";

import styles from "./WordClockCell.module.scss";

const WordClockCell = ({ col = "default", ...rest }) => {
  return (
    <div className={styles[`containerSizer__col-${col}`]}>
      <div className={styles.container}>
        <WordClockEditable {...rest} />
      </div>
    </div>
  );
};

export default WordClockCell;
