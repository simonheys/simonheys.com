import * as React from "react";
import Image, { ImageProps } from "next/image";

import { getPropertiesForImage } from "../../modules/content";

interface ImageResponsiveProps extends ImageProps {
  src: string;
}

const ImageResponsive: React.FC<ImageResponsiveProps> = ({
  src,
  alt = "",
  ...rest
}) => {
  const { width, height } = React.useMemo(() => {
    const properties = getPropertiesForImage(src);
    return properties;
  }, [src]);

  return (
    <Image
      src={`/${src}`}
      alt={alt}
      width={width}
      height={height}
      layout={"responsive"}
      {...rest}
    />
  );
};

export const ImageResponsiveColored: React.FC<ImageResponsiveProps> = ({
  src,
  ...rest
}) => {
  const { color } = React.useMemo(() => {
    return getPropertiesForImage(src);
  }, [src]);

  return (
    <div style={{ backgroundColor: color }}>
      <ImageResponsive src={src} {...rest} />
    </div>
  );
};

export default ImageResponsive;
