import { motion, useAnimation } from 'framer-motion';
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export interface AppearWhenInViewProps extends PropsWithChildren {
  className?: string;
}

export const AppearImmediate: FC<AppearWhenInViewProps> = (props) => {
  return <div {...props} />;
};

export const AppearWhenInView: FC<AppearWhenInViewProps> = (props) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const checkInView = useCallback(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    timeoutId.current = setTimeout(checkInView, 150);
    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
    };
  }, [checkInView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 0 },
      }}
      {...props}
    ></motion.div>
  );
};

export default AppearWhenInView;
