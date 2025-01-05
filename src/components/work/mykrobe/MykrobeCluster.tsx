import { FC } from 'react';

import ExperimentCluster, { ExperimentClusterType } from './ExperimentCluster';

import mst1 from './json/mst-1.json';
import mst2 from './json/mst-2.json';
import mst3 from './json/mst-3.json';

const mst = {
  'mst-1': mst1,
  'mst-2': mst2,
  'mst-3': mst3,
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
