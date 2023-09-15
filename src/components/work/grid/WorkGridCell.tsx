import { motion } from 'framer-motion';
import { FC } from 'react';

import { Page } from '../../../modules/content';
import ImageFadeIn from '../../ui/ImageFadeIn';
import Link from '../../ui/Link';

import styles from './WorkGridCell.module.scss';

export interface WorkGridCellProps {
  page: Page;
}

const WorkGridCell: FC<WorkGridCellProps> = ({ page }) => {
  const { path, title, subtitle, thumbnails } = page;
  if (!thumbnails) {
    return null;
  }
  const src = thumbnails[0].src;
  return (
    <Link href={path} className={styles.containerLink}>
      <div className={styles.containerSizer}>
        <motion.div
          key={`work-grid-cell-${path}`}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
          className={styles.container}
        >
          <ImageFadeIn src={src} alt={title || ''} />
        </motion.div>
      </div>
      <div className={styles.caption}>
        <span className={styles.title}>{title}</span>{' '}
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </Link>
  );
};

export default WorkGridCell;
