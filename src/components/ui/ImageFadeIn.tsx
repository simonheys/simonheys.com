import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo, useCallback } from 'react';

import * as contentModule from '../../modules/content';

interface ImageFadeInProps {
  src: string;
  alt: string;
  backgroundColor?: string;
}

const css = { width: '100%', height: 'auto' };

const ImageFadeIn: FC<ImageFadeInProps> = ({
  src,
  alt,
  backgroundColor,
  ...rest
}) => {
  const controls = useAnimation();
  const onLoadingComplete = useCallback(() => {
    controls.start('visible');
  }, [controls]);

  const { width, height, color } = useMemo(() => {
    return contentModule.getPropertiesForImage(src);
  }, [src]);

  return (
    <div style={{ backgroundColor: backgroundColor || color }}>
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
          style={css}
          {...rest}
        />
      </motion.div>
    </div>
  );
};

export default ImageFadeIn;
