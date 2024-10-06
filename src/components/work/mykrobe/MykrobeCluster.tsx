import { FC } from 'react';

import ExperimentCluster, { ExperimentClusterType } from './ExperimentCluster';

const mst = {
  'mst-1': require(`./json/mst-1.json`),
  'mst-2': require(`./json/mst-2.json`),
  'mst-3': require(`./json/mst-3.json`),
};

export interface MykrobeClusterProps {
  src: keyof typeof mst;
}

const MykrobeCluster: FC<MykrobeClusterProps> = ({ src = 'mst-1' }) => {
  const experimentCluster: ExperimentClusterType = mst[src] || {};

  return (
    <div className="relative h-0 w-full overflow-hidden rounded pb-[114.65%]">
      <ExperimentCluster experimentCluster={experimentCluster} />
    </div>
  );
};

export default MykrobeCluster;
