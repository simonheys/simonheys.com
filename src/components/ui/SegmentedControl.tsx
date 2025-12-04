import { LayoutGroup, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { cn } from '@/utils/cn';

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
      <div className="panel m-0 inline-flex list-none p-0">
        {options.map((item, index) => {
          const isActive = index === selectedIndex;
          return (
            <motion.li
              key={item.value}
              className="relative mb-0 leading-none"
              whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
            >
              <div
                onClick={() => onChange(item.value)}
                className={cn(
                  'hover:text-link-hover relative m-0 cursor-pointer p-2 leading-none transition-colors duration-100 ease-in sm:p-3',
                  isActive && 'text-primary',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="SegmentedControlActive"
                    className="panel-border-radius bg-panel-hover absolute inset-0 z-1"
                    transition={{ duration: 0.5, type: 'spring' }}
                  />
                )}
                <div className="relative z-2 text-sm whitespace-nowrap">
                  {item.title}
                </div>
              </div>
            </motion.li>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default SegmentedControl;
