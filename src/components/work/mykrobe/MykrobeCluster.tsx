import { FC } from "react";

import ExperimentCluster, { ExperimentClusterType } from "./ExperimentCluster";
import styles from "./MykrobeCluster.module.scss";

const mst = {
  "mst-1": require(`./json/mst-1.json`),
  "mst-2": require(`./json/mst-2.json`),
  "mst-3": require(`./json/mst-3.json`),
};

export interface MykrobeClusterProps {
  src: keyof typeof mst;
}

const MykrobeCluster: FC<MykrobeClusterProps> = ({ src = "mst-1" }) => {
  const experimentCluster: ExperimentClusterType = mst[src] || {};

  return (
    <div className={styles.containerSizer}>
      <ExperimentCluster experimentCluster={experimentCluster} />
    </div>
  );
};

export default MykrobeCluster;
