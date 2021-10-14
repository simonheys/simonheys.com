import * as React from "react";

import WordClockEditable, { WordClockEditableProps } from "./WordClockEditable";

import styles from "./WordClockCell.module.scss";

export interface WordClockCellProps extends WordClockEditableProps {
  col: string | number;
  // ...rest
  [x: string]: any;
}

const WordClockCell: React.FC<WordClockCellProps> = ({
  col = "default",
  ...rest
}) => {
  return (
    <div className={styles[`containerSizer__col-${col}`]}>
      <div className={styles.container}>
        <WordClockEditable {...rest} />
      </div>
    </div>
  );
};

export default WordClockCell;
