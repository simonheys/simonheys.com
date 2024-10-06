import { useRouter } from "next/router";
import { FC } from "react";

import { getNextPortfolioPageForPath } from "../../modules/content";
import AppearWhenInView from "../ui/AppearWhenInView";

import WorkGridCell from "./grid/WorkGridCell";

const WorkNext: FC = () => {
  const router = useRouter();
  const nextPage = getNextPortfolioPageForPath(router.asPath);
  if (!nextPage) {
    return null;
  }
  return (
    <AppearWhenInView>
      <div className="containerAlias">
        <div className="border-t"></div>
      </div>
      <div className="containerAlias mb-12 grid auto-cols-fr grid-flow-col gap-6 pt-2">
        <div className="sm:col-span-6">
          <div className="text-4xl font-bold text-accent">Next</div>
        </div>
        <div className="sm:col-span-6">
          <WorkGridCell page={nextPage} />
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default WorkNext;
