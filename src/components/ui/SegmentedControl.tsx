import { motion, LayoutGroup } from 'framer-motion';
import { FC, ReactNode } from 'react';

import styles from './SegmentedControl.module.scss';

export interface SegmentedControlProps {
  options: {
    title: ReactNode;
    value: string | number;
  }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const SegmentedControl: FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  const selectedIndex = options.findIndex((item) => item.value === value);
  return (
    <LayoutGroup>
      <div className={styles.container}>
        {options.map((item, index) => {
          const isActive = index === selectedIndex;
          return (
            <motion.li
              key={item.value}
              className={styles.item}
              whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
            >
              <div
                onClick={() => onChange(item.value)}
                className={isActive ? styles.buttonActive : styles.button}
              >
                {isActive && (
                  <motion.div
                    layoutId="SegmentedControlActive"
                    className={styles.active}
                    transition={{ duration: 0.5, type: 'spring' }}
                  />
                )}
                <div className={styles.label}>{item.title}</div>
              </div>
            </motion.li>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default SegmentedControl;
