import * as React from "react";
import { motion } from "framer-motion";

import styles from "./CardItem.module.scss";

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

const CardItem: React.FC<CardItemProps> = ({
  post,
  size = "base",
  animated = false,
}) => {
  const { title, summary, category, date, id } = post;
  const inner = (
    <React.Fragment>
      <div className={styles.title}>{title}</div>
      {size !== "sm" && <div className={styles.summary}>{summary}</div>}
      <div className={styles.footer}>
        <span className={styles.category}>{category}</span> &middot; {date}
      </div>
    </React.Fragment>
  );
  if (animated) {
    return (
      <motion.div
        layout
        layoutId={`card-item-${id}`}
        className={styles[`container-${size}`]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {inner}
      </motion.div>
    );
  }
  return <div className={styles[`container-${size}`]}>{inner}</div>;
};

export default CardItem;
