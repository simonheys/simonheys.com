import { motion } from 'framer-motion';
import { FC } from 'react';

import { Page } from '../../../modules/content';
import ImageFadeIn from '../../ui/ImageFadeIn';
import Link from '../../ui/Link';

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
    <Link href={path} className="group">
      <div className="aspect-video w-full overflow-hidden rounded-[0.25em]">
        <motion.div
          key={`work-grid-cell-${path}`}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 1.01 }}
          transition={{ duration: 0.1 }}
          className="bg-gray-100 dark:bg-gray-900"
        >
          <ImageFadeIn src={src} alt={title || ''} />
        </motion.div>
      </div>
      <div className="mt-1 text-balance text-2xl font-medium">
        <span>{title}</span>{' '}
        <span className="text-gray-500 transition-colors duration-100 group-hover:text-gray-500 sm:text-transparent dark:group-hover:text-gray-400">
          {subtitle}
        </span>
      </div>
    </Link>
  );
};

export default WorkGridCell;
