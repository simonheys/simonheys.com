import { FC } from 'react';

import styles from './Caption.module.scss';

export interface CaptionProps {
  caption?: string;
}

const Caption: FC<CaptionProps> = ({ caption }) => {
  if (!caption) {
    return null;
  }
  return (
    <div className={'row'}>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default Caption;
