import { FC } from "react";

import styles from "./WordClockCell.module.scss";
import WordClockEditable, { WordClockEditableProps } from "./WordClockEditable";

export interface WordClockCellProps extends WordClockEditableProps {
  col: string | number;
}

const WordClockCell: FC<WordClockCellProps> = ({
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
