'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { getNextPortfolioPageForPath } from '../../modules/content';
import AppearWhenInView from '../ui/AppearWhenInView';

import WorkGridCell from './grid/WorkGridCell';

const WorkNext: FC = () => {
  const pathname = usePathname();
  const nextPage = getNextPortfolioPageForPath(pathname);
  if (!nextPage) {
    return null;
  }
  return (
    <AppearWhenInView>
      <div className="containerAlias">
        <div className="border-t"></div>
      </div>
      <div className="containerAlias mb-12 pt-2 sm:grid sm:grid-cols-2 sm:gap-6">
        <div className="mb-2 text-4xl font-bold">Next</div>
        <WorkGridCell page={nextPage} />
      </div>
    </AppearWhenInView>
  );
};

export default WorkNext;
