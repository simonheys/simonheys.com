import * as React from "react";
import useSWR from "swr";

import { WordClock } from "wordclock/packages/wordclock-js/dist";

import styles from "./WordClockCell.module.scss";

const WordClockCell = ({
  col = "default",
  file = "English_simple_fragmented.json",
}) => {
  const { data: words } = useSWR(`/api/words/${file}`);
  return (
    <div className={styles[`containerSizer__col-${col}`]}>
      <div className={styles.container}>
        <WordClock words={words} />
      </div>
    </div>
  );
};

export default WordClockCell;
