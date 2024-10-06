import { FC } from 'react';

import { getMeta, getPageForPath } from '../../../modules/content';
import AppearWhenInView from '../../ui/AppearWhenInView';

import WorkGridCell from './WorkGridCell';

const WorkGrid: FC = () => {
  const pages = getMeta().portfolio.pages;
  return (
    <div className="containerAlias mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:mb-12">
      {pages.map((entry, index) => {
        const { path } = entry;
        const page = getPageForPath(path);
        if (!page) {
          return null;
        }
        return (
          <AppearWhenInView key={`work-grid-${path}-${index}`}>
            <WorkGridCell page={page} />
          </AppearWhenInView>
        );
      })}
    </div>
  );
};

export default WorkGrid;
