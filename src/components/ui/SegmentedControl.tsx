import * as React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

import styles from "./SegmentedControl.module.scss";

export interface SegmentedControlProps {
  options: {
    title: string;
    value: string | number;
  }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  const selectedIndex = options.findIndex((item) => item.value === value);
  return (
    <AnimateSharedLayout>
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
                    transition={{ duration: 0.5, type: "spring" }}
                  />
                )}
                <div className={styles.label}>{item.title}</div>
              </div>
            </motion.li>
          );
        })}
      </div>
    </AnimateSharedLayout>
  );
};

export default SegmentedControl;
