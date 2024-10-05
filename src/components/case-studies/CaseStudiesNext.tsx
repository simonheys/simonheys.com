import { useRouter } from "next/router";
import { FC } from "react";

import { getNextCaseStudiesPageForPath } from "../../modules/content";
import AppearWhenInView from "../ui/AppearWhenInView";

import styles from "./CaseStudiesNext.module.scss";
import CaseStudiesGridCell from "./grid/CaseStudiesGridCell";

const CaseStudiesNext: FC = () => {
  const router = useRouter();
  const nextPage = getNextCaseStudiesPageForPath(router.asPath);
  if (!nextPage) {
    return null;
  }
  return (
    <AppearWhenInView>
      <div className="container-fluid">
        <div className="row gx-0 border-top"></div>
      </div>
      <div className="container-fluid mb-5 pt-2">
        <div className="row mb-5">
          <div className="col-sm-6">
            <div className={styles.title}>Next</div>
          </div>
          <div className="col-sm-6">
            <CaseStudiesGridCell page={nextPage} />
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default CaseStudiesNext;
