import * as React from "react";
import { interpolate, easeInOut, easeOut } from "popmotion";

import useBoundingClientRectInView from "../../hooks/useBoundingClientRectInView";
import useWindowSize from "../../hooks/useWindowSize";
import ImageResponsive from "./ImageResponsive";
import * as contentModule from "../../modules/content";

import styles from "./ScrollingBrowserCell.module.scss";

const MASK_ATTRIBUTES = {
  default: {
    svg: {
      src: "ui/browser-mask.svg",
      width: 1600,
      height: 900,
    },
    mask: {
      top: 106,
      left: 288,
      width: 1024,
      height: 728,
    },
  },
  "col-6": {
    svg: {
      src: "ui/col-6-browser-mask.svg",
      width: 942,
      height: 1080,
    },
    mask: {
      top: 84 + 40,
      left: 84,
      width: 774,
      height: 912 - 40,
    },
  },
  "col-6-phone": {
    svg: {
      src: "ui/col-6-phone-mask.svg",
      width: 942,
      height: 1080,
    },
    mask: {
      top: 252,
      left: 309,
      width: 325,
      height: 576,
    },
  },
};

export type ScrollingBrowserCellProps = {
  src?: string;
  system?: string[];
  mask?: string;
  maskSrc?: string;
};

const ScrollingBrowserCell = ({
  src,
  system,
  mask: maskKey = "default",
  maskSrc,
}: ScrollingBrowserCellProps) => {
  const { svg, mask } = MASK_ATTRIBUTES[maskKey];

  const {
    ref: containerRef,
    boundingClientRect: containerBoundingClientRect,
    inView,
  } = useBoundingClientRectInView();
  const windowSize = useWindowSize();

  const [interpolationValue, setInterpolationValue] = React.useState(0);
  const [containerScale, setContainerScale] = React.useState(1);

  React.useEffect(() => {
    if (!containerBoundingClientRect) {
      return;
    }
    setContainerScale(containerBoundingClientRect.width / svg.width);
  }, [containerBoundingClientRect, svg.width]);

  const { width: imageWidth, height: imageHeight } = React.useMemo(() => {
    const properties = contentModule.getPropertiesForImage(src);
    return properties;
  }, [src]);

  React.useEffect(() => {
    if (!containerBoundingClientRect || !inView) {
      return;
    }
    const startFraction = system ? 0.1 : 0.9;
    const stopFraction = system ? 0.4 : 0.7;

    const startsTop =
      windowSize.clientHeight -
      containerBoundingClientRect.height * startFraction;
    const stopsTop = -containerBoundingClientRect.height * stopFraction;

    const mapper = interpolate([startsTop, stopsTop], [0, 1], {
      ease: easeInOut,
    });
    const value = mapper(containerBoundingClientRect.top);
    setInterpolationValue(value);
  }, [containerBoundingClientRect, inView, system, windowSize.clientHeight]);

  const style = React.useMemo(() => {
    if (!inView) {
      return {};
    }

    const imageScale = mask.width / imageWidth;
    const maxScroll = Math.max(0, imageScale * imageHeight - mask.height);
    const scrollValue = interpolationValue * maxScroll;
    const left = Math.round(containerScale * mask.left);
    const right = left;
    const top = system
      ? containerScale * mask.top
      : containerScale * mask.top - containerScale * scrollValue;

    const style = {
      left,
      right,
      // top,
      transform: `translate(0, ${top}px)`,
    };

    return style;
  }, [
    containerScale,
    imageHeight,
    imageWidth,
    inView,
    interpolationValue,
    mask.height,
    mask.left,
    mask.top,
    mask.width,
    system,
  ]);

  const systemStyles = React.useMemo(() => {
    if (!system || !inView) {
      return null;
    }
    const systemStyles = [];
    const numberOfImages = system.length;
    for (let i = 0; i < numberOfImages; i++) {
      const mapper = interpolate(
        [i / numberOfImages, (i + 1) / numberOfImages],
        [1, 0],
        {
          ease: easeOut,
        }
      );
      const value = mapper(interpolationValue);
      // const ty = containerScale * 100 * value;
      // const s = 1 + 0.2 * value;
      const ty = containerScale * 50 * value;
      const s = 1 - 0.1 * value;
      systemStyles[i] = {
        transform: `translate(0, ${ty}px) scale(${s}, ${s})`,
        opacity: 1 - value,
      };
    }
    return systemStyles;
  }, [containerScale, inView, interpolationValue, system]);

  const svgSrc = maskSrc || svg.src;

  return (
    <div
      ref={containerRef}
      className={styles[`containerSizer__mask--${maskKey}`]}
    >
      <div className={styles.container}>
        <div className={styles.imageContainer} style={style}>
          {src && <ImageResponsive src={src} alt={""} />}
          {system &&
            systemStyles &&
            system.map((image, index) => (
              <div key={index} style={systemStyles[index]}>
                <ImageResponsive src={image} alt={""} priority />
              </div>
            ))}
        </div>
        <div className={styles.maskContainer}>
          <ImageResponsive src={svgSrc} alt={""} priority />
        </div>
      </div>
    </div>
  );
};

export default ScrollingBrowserCell;
