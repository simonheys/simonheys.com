import * as React from "react";
import AppearWhenInView from "../ui/AppearWhenInView";

import WorkRowCol, { WorkRowColProps } from "./WorkRowCol";

export interface WorkRowProps {
  columns: WorkRowColProps[];
}

const WorkRow: React.FC<WorkRowProps> = ({ columns, ...rest }) => {
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
      </div>
    </AppearWhenInView>
  );
};

export default WorkRow;
