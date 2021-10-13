import * as React from "react";

import { getMeta, getPageForPath } from "../../../modules/content";

import AppearWhenInView from "../../ui/AppearWhenInView";

import WorkGridCell from "./WorkGridCell";

const WorkGrid = () => {
  const pages = getMeta().work.pages;
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      <div className={"row"}>
        {pages.map((entry, index) => {
          const { path } = entry;
          const page = getPageForPath(path);
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
