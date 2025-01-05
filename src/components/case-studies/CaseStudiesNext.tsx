'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { getNextCaseStudiesPageForPath } from '../../modules/content';
import AppearWhenInView from '../ui/AppearWhenInView';

import CaseStudiesGridCell from './grid/CaseStudiesGridCell';

const CaseStudiesNext: FC = () => {
  const pathname = usePathname();
  const nextPage = getNextCaseStudiesPageForPath(pathname);
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
            <div className="h1 mb-2 font-bold sm:mb-0">Next</div>
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
