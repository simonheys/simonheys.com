import * as React from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const AppearWhenInView = (props) => {
  const timeoutId = React.useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const checkInView = React.useCallback(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  React.useEffect(() => {
    timeoutId.current = setTimeout(checkInView, 150);
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [checkInView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 24 },
      }}
      {...props}
    ></motion.div>
  );
};

export default AppearWhenInView;
