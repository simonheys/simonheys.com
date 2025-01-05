'use client';

import { PlaybackControls, animate, easeInOut, interpolate } from 'popmotion';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import useBoundingClientRectInView from '../../hooks/useBoundingClientRectInView';
import useWindowSize from '../../hooks/useWindowSize';
import * as contentModule from '../../modules/content';

import ImageResponsive from './ImageResponsive';

const MASK_ATTRIBUTES = {
  default: {
    svg: {
      src: 'ui/browser-mask.svg',
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
  'col-6': {
    svg: {
      src: 'ui/col-6-browser-mask.svg',
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
  'col-6-phone': {
    svg: {
      src: 'ui/col-6-phone-mask.svg',
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

export interface ScrollingBrowserCellProps {
  src: string;
  system?: string[];
  mask?: keyof typeof MASK_ATTRIBUTES;
  maskSrc?: string;
  drivenByScroll?: boolean;
}

const ScrollingBrowserCell: FC<ScrollingBrowserCellProps> = ({
  src,
  system,
  mask: maskKey = 'default',
  maskSrc,
  drivenByScroll = false,
}) => {
  const { svg, mask } = MASK_ATTRIBUTES[maskKey];

  const {
    ref: containerRef,
    boundingClientRect: containerBoundingClientRect,
    inView,
  } = useBoundingClientRectInView();
  const windowSize = useWindowSize();
  const animateRef = useRef<PlaybackControls | null>(null);

  const [interpolationValue, setInterpolationValue] = useState(0);
  const [containerScale, setContainerScale] = useState(1);

  useEffect(() => {
    if (!containerBoundingClientRect?.width) {
      return;
    }
    setContainerScale(containerBoundingClientRect.width / svg.width);
  }, [containerBoundingClientRect, svg.width]);

  const { width: imageWidth, height: imageHeight } = useMemo(() => {
    const properties = contentModule.getPropertiesForImage(src);
    return properties;
  }, [src]);

  useEffect(() => {
    if (!windowSize?.clientHeight) {
      return;
    }
    if (drivenByScroll) {
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
    } else {
      if (!containerBoundingClientRect) {
        return;
      }
      const startFraction = system ? 0.9 : 0.5;
      const delayMilliseconds = system ? 0 : 500;
      if (
        inView &&
        !animateRef.current &&
        containerBoundingClientRect.top <=
          windowSize.clientHeight * startFraction
      ) {
        // start
        animateRef.current = animate({
          from: 0,
          to: 1,
          ease: easeInOut,
          elapsed: -delayMilliseconds,
          duration: 3000,
          onUpdate: setInterpolationValue,
          repeat: Infinity,
          repeatDelay: 1000,
          repeatType: 'reverse',
        });
      }
      if (!inView && animateRef.current) {
        //stop and reset
        animateRef.current.stop();
        animateRef.current = null;
        setInterpolationValue(0);
      }
    }
  }, [
    containerBoundingClientRect,
    drivenByScroll,
    inView,
    system,
    windowSize?.clientHeight,
  ]);

  const style = useMemo(() => {
    if (!inView || !containerScale) {
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

  const systemStyles = useMemo(() => {
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
          ease: easeInOut,
        },
      );
      const value = mapper(interpolationValue);
      const ty = containerScale * 50 * value;
      const s = 1 + 0.1 * value;
      // const ty = containerScale * 50 * value;
      // const s = 1 - 0.1 * value;
      systemStyles[i] = {
        transform: `translate(0, ${ty}px) scale(${s}, ${s})`,
        opacity: 1 - value,
      };
    }
    return systemStyles;
  }, [containerScale, inView, interpolationValue, system]);

  const svgSrc = maskSrc || svg.src;

  // Calculate padding bottom based on mask type
  const paddingBottomClass = useMemo(() => {
    switch (maskKey) {
      case 'default':
        return 'pb-[56.25%]'; // (9/16 * 100%)
      case 'col-6':
      case 'col-6-phone':
        return 'pb-[114.65%]'; // (1080/942 * 100%)
      default:
        return 'pb-[56.25%]';
    }
  }, [maskKey]);

  return (
    <div
      ref={containerRef}
      className={`relative h-0 w-full overflow-hidden ${paddingBottomClass}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[0.2rem] bg-white">
        <div className="absolute inset-x-0 top-0" style={style}>
          {src && <ImageResponsive src={src} alt="" />}
          {system &&
            systemStyles &&
            system.map((image, index) => (
              <div key={index} style={systemStyles[index]}>
                <ImageResponsive src={image} alt="" priority />
              </div>
            ))}
        </div>
        <div className="absolute inset-0">
          <ImageResponsive src={svgSrc} alt="" priority />
        </div>
      </div>
    </div>
  );
};

export default ScrollingBrowserCell;
