import { FC, PropsWithChildren, useState, useEffect } from 'react';

import useWindowSize from '../../hooks/useWindowSize';
import styles from './Fill.module.scss';

const Fill: FC<PropsWithChildren> = ({ children }) => {
  const windowSize = useWindowSize();
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({ height: windowSize?.clientHeight });
  }, [windowSize?.clientHeight]);

  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default Fill;
