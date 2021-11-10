import * as React from "react";
import AppearWhenInView from "../ui/AppearWhenInView";

import WorkRowCol, { WorkRowColProps } from "./WorkRowCol";

import Caption from "../ui/Caption";

export interface WorkRowProps {
  columns: WorkRowColProps[];
  caption?: string;
}

const WorkRow: React.FC<WorkRowProps> = ({ columns, caption, ...rest }) => {
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        <div className={"row"}>
          {columns ? (
            columns.map((column, index: number) => {
              return <WorkRowCol key={index} {...column} />;
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
