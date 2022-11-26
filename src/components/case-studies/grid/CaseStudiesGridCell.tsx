import { FC } from 'react';

import { Page } from '../../../modules/content';
import ImageFadeIn from '../../ui/ImageFadeIn';
import Link from '../../ui/Link';
import { ChevronRight } from '../../ui/icons';
import styles from './CaseStudiesGridCell.module.scss';

export interface CaseStudiesGridCellProps {
  page: Page;
}

const CaseStudiesGridCell: FC<CaseStudiesGridCellProps> = ({ page }) => {
  const { path, meta } = page;
  const { title, subtitle, text, icon } = meta || {};
  return (
    <Link href={path} className={styles.container}>
      {icon && (
        <div className={styles.icon}>
          <ImageFadeIn
            src={icon}
            alt={title || ''}
            backgroundColor={'transparent'}
          />
        </div>
      )}
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.text}>{text}</div>
      <div className={styles.link}>
        Read more <ChevronRight />
      </div>
    </Link>
  );
};

export default CaseStudiesGridCell;
