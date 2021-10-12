import * as React from "react";

import * as contentModule from "../../../modules/content";
import AppearWhenInView from "../../ui/AppearWhenInView";

import { WorkGridCell } from "./WorkGridCell";

const WorkGrid = () => {
  const pages = contentModule.getMeta().work.pages;
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      <div className={"row"}>
        {pages.map((entry: contentModule.Page, index) => {
          const { path } = entry;
          const page = contentModule.getPageForPath(path);
          if (!page) {
            return null;
          }
          return (
            <AppearWhenInView
              key={`work-grid-${path}-${index}`}
              className={"col-md-6 mb-3 mb-md-4"}
            >
              <WorkGridCell page={page} />
            </AppearWhenInView>
          );
        })}
      </div>
    </div>
  );
};

export default WorkGrid;
