import * as React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

import * as contentModule from "../../modules/content";

const ImageFadeIn = ({ src, alt, ...rest }) => {
  const controls = useAnimation();
  const onLoadingComplete = React.useCallback(() => {
    controls.start("visible");
  }, [controls]);

  const { width, height, color } = React.useMemo(() => {
    return contentModule.getPropertiesForImage(src);
  }, [src]);

  return (
    <div style={{ backgroundColor: color }}>
      <motion.div
        animate={controls}
        initial="hidden"
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <Image
          onLoadingComplete={onLoadingComplete}
          src={`/${src}`}
          alt={alt}
          width={width}
          height={height}
          layout={"responsive"}
          {...rest}
        />
      </motion.div>
    </div>
  );
};

export default ImageFadeIn;
