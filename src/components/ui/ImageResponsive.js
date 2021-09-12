import * as React from "react";
import Image from "next/image";

import * as contentModule from "../../modules/content";

const ImageResponsive = ({ src, alt, ...rest }) => {
  const { width, height } = React.useMemo(() => {
    const properties = contentModule.getPropertiesForImage(src);
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

export const ImageResponsiveColored = ({ src, ...rest }) => {
  const { color } = React.useMemo(() => {
    return contentModule.getPropertiesForImage(src);
  }, [src]);

  return (
    <div style={{ backgroundColor: color }}>
      <ImageResponsive src={src} {...rest} />
    </div>
  );
};

export default ImageResponsive;
