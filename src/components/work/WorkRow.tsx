import * as React from "react";
import AppearWhenInView from "../ui/AppearWhenInView";

import WorkRowCol from "./WorkRowCol";

const WorkRow = ({ columns, ...rest }) => {
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
