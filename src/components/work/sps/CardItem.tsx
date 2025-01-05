import { motion } from 'framer-motion';
import { FC } from 'react';

export type CardItemPostType = {
  title: string;
  summary: string;
  category: string;
  date: string;
  id: string;
};

export interface CardItemProps {
  post: CardItemPostType;
  size: string;
  animated: boolean;
}

const CardItem: FC<CardItemProps> = ({
  post,
  size = 'base',
  animated = false,
}) => {
  const { title, summary, category, date, id } = post;

  const containerClasses = {
    base: 'flex flex-col flex-grow p-1 mb-1 sm:p-2 sm:mb-2 bg-gray-200 text-gray-600 rounded',
    sm: 'text-sm',
    lg: 'text-base',
  }[size];

  const titleClasses = {
    base: 'mb-1 sm:mb-2 text-gray-600 font-bold text-xl leading-tight',
    sm: 'text-sm',
    lg: 'text-2xl',
  }[size];

  const inner = (
    <>
      <div className={titleClasses}>{title}</div>
      {size !== 'sm' && <div className="mb-1 text-sm sm:mb-2">{summary}</div>}
      <div className="mt-auto text-xs text-gray-500">
        <span className="font-bold">{category}</span> &middot; {date}
      </div>
    </>
  );

  if (animated) {
    return (
      <motion.div
        layout
        layoutId={`card-item-${id}`}
        className={containerClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {inner}
      </motion.div>
    );
  }
  return <div className={containerClasses}>{inner}</div>;
};

export default CardItem;
