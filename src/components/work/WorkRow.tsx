import { FC } from 'react';

import AppearWhenInView from '../ui/AppearWhenInView';
import Caption from '../ui/Caption';

import WorkRowCol, { WorkRowColProps } from './WorkRowCol';

export interface WorkRowProps extends WorkRowColProps {
  columns: WorkRowColProps[];
  caption?: string;
}

const WorkRow: FC<WorkRowProps> = ({ columns, caption, ...rest }) => {
  return (
    <AppearWhenInView>
      <div className="containerAlias">
        <div className="sm:grid sm:auto-cols-fr sm:grid-flow-col sm:gap-6">
          {columns ? (
            columns.map((column, index: number) => {
              return <WorkRowCol {...column} key={index} />;
            })
          ) : (
            <WorkRowCol {...rest} />
          )}
        </div>
        {caption && <Caption caption={caption} />}
      </div>
    </AppearWhenInView>
  );
};

export default WorkRow;
