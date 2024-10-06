import { FC } from "react";

import WordClockEditable, { WordClockEditableProps } from "./WordClockEditable";
import styles from "./WordClockFill.module.scss";

const WordClockFill: FC<WordClockEditableProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className="row h-full sm:pb-12">
        <div className="col h-full">
          <WordClockEditable {...props} />
        </div>
      </div>
    </div>
  );
};

export default WordClockFill;
