import * as React from "react";

import styles from "./test.module.scss";

const Test: React.FC = () => {
  return (
    <div>
      <div className={"container pb-5"}>
        <div className={"py-3"}>
          <h1>Grid exploration</h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.one}>One</div>
          <div className={styles.two}>Two</div>
          <div className={styles.three}>Three</div>
          <div className={styles.four}>Four</div>
          <div className={styles.five}>Five</div>
          <div className={styles.six}>Six</div>
          <div className={styles.seven}>Seven</div>
          <div className={styles.eight}>Eight</div>
          <div className={styles.nine}>Nine</div>
        </div>
      </div>
    </div>
  );
};

export default Test;
