import { FC } from 'react';

import { Page } from '../../../modules/content';
import { ChevronRight } from '../../ui/icons';
import ImageFadeIn from '../../ui/ImageFadeIn';
import Link from '../../ui/Link';

export interface CaseStudiesGridCellProps {
  page: Page;
}

const CaseStudiesGridCell: FC<CaseStudiesGridCellProps> = ({ page }) => {
  const { path, meta } = page;
  const { title, subtitle, text, icon } = meta || {};

  const linkLabel = subtitle
    ? `Read the ${subtitle} case study`
    : 'Read case study';
  return (
    <Link
      href={path}
      className="text-body hover:text-body hover:bg-gray-150 flex flex-1 flex-col rounded bg-gray-100 p-3 transition-colors duration-100 lg:p-5"
    >
      {icon && (
        <div className="mb-4 w-20 overflow-hidden rounded-full shadow-lg">
          <ImageFadeIn
            src={icon}
            alt={title || ''}
            backgroundColor="transparent"
          />
        </div>
      )}
      <div className="h3 font-bold">{subtitle}</div>
      <div className="h5">{text}</div>
      <div className="h5 group-hover:text-link-hover text-primary m-0 transition-colors duration-100">
        {linkLabel} <ChevronRight />
      </div>
    </Link>
  );
};

export default CaseStudiesGridCell;
