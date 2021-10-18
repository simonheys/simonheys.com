import * as React from "react";

import styles from "./test.module.scss";

const Test: React.FC = () => {
  return (
    <div>
      <div className={"container"}>
        <h1>Grid exploration</h1>
        <div className={styles.wrapper}>
          <div className={styles.one}>
            <div className={styles.moduleInner}>One</div>
          </div>
          <div className={styles.two}>
            <div className={styles.moduleInner}>Two</div>
          </div>
          <div className={styles.three}>
            <div className={styles.moduleInner}>Three</div>
          </div>
          <div className={styles.four}>
            <div className={styles.moduleInner}>Four</div>
          </div>
          <div className={styles.five}>
            <div className={styles.moduleInner}>Five</div>
          </div>
          <div className={styles.six}>
            <div className={styles.moduleInner}>Six</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
