import * as React from "react";

import ExperimentCluster from "./ExperimentCluster";

import styles from "./MykrobeCluster.module.scss";

const MykrobeCluster = ({ src }) => {
  const experimentCluster = require(`../../../../public/${src}`);

  return (
    <div className={styles.containerSizer}>
      <ExperimentCluster experimentCluster={experimentCluster} />
    </div>
  );
};

export default MykrobeCluster;
