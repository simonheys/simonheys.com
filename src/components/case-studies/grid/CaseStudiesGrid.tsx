import { FC } from 'react';

import { getMeta, getPageForPath } from '../../../modules/content';
import AppearWhenInView from '../../ui/AppearWhenInView';

import CaseStudiesGridCell from './CaseStudiesGridCell';

const CaseStudiesGrid: FC = () => {
  const pages = getMeta()['case-studies'].pages;
  return (
    <div className="container-fluid mb-md-4 mb-3">
      <div className="row">
        {pages.map((entry, index) => {
          const { path } = entry;
          const page = getPageForPath(path);
          if (!page) {
            return null;
          }
          return (
            <AppearWhenInView
              key={`case-studies-grid-${path}-${index}`}
              className="col-md mb-md-4 d-flex flex-column mb-3"
            >
              <CaseStudiesGridCell page={page} />
            </AppearWhenInView>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudiesGrid;
