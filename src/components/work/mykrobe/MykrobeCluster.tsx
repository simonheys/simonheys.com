import * as React from "react";

import ExperimentCluster from "./ExperimentCluster";

import styles from "./MykrobeCluster.module.scss";

const mst = {
  "mst-1": require(`./json/mst-1.json`),
  "mst-2": require(`./json/mst-2.json`),
  "mst-3": require(`./json/mst-3.json`),
};

const MykrobeCluster = ({ src = "mst-1" }: { src: string }) => {
  const experimentCluster = mst[src] || {};

  return (
    <div className={styles.containerSizer}>
      <ExperimentCluster experimentCluster={experimentCluster} />
    </div>
  );
};

export default MykrobeCluster;
