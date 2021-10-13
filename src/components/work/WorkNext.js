import * as React from "react";
import { useRouter } from "next/router";

import * as contentModule from "../../modules/content";
import AppearWhenInView from "../ui/AppearWhenInView";
import WorkGridCell from "./grid/WorkGridCell";

import styles from "./WorkNext.module.scss";

const WorkNext = () => {
  const router = useRouter();
  const nextPage = contentModule.getNextWorkPageForPath(router.asPath);
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        <div className={"row gx-0 border-top"}></div>
      </div>
      <div className={"container-fluid pt-2 mb-5"}>
        <div className={"row mb-5"}>
          <div className={"col-sm-6"}>
            <div className={styles.title}>Next</div>
          </div>
          <div className={"col-sm-6"}>
            <WorkGridCell page={nextPage} />
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default WorkNext;
