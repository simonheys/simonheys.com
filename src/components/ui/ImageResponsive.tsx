import Image, { ImageProps } from "next/image";
import { FC, useMemo } from "react";

import { getPropertiesForImage } from "../../modules/content";

export interface ImageResponsiveProps extends ImageProps {
  src: string;
}

const css = { width: "100%", height: "auto" };

const ImageResponsive: FC<ImageResponsiveProps> = ({
  src,
  alt = "",
  ...rest
}) => {
  const { width, height } = useMemo(() => {
    const properties = getPropertiesForImage(src);
    return properties;
  }, [src]);

  return (
    <Image
      src={`/${src}`}
      alt={alt}
      width={width}
      height={height}
      sizes="100vw"
      style={css}
      {...rest}
    />
  );
};

export const ImageResponsiveColored: FC<ImageResponsiveProps> = ({
  src,
  ...rest
}) => {
  const { color } = useMemo(() => {
    return getPropertiesForImage(src);
  }, [src]);

  return (
    <div style={{ backgroundColor: color }}>
      <ImageResponsive src={src} {...rest} />
    </div>
  );
};

export default ImageResponsive;
