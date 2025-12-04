import { useEffect, useRef, useState } from 'react';

import useAnimationFrame from './useAnimationFrame';

export interface WindowScrollVelocity {
  timeStamp: number;
  scrollX: number;
  scrollY: number;
  previousScrollX?: number;
  previousScrollY?: number;
  deltaScrollX?: number;
  deltaScrollY?: number;
  velocityScrollX?: number;
  velocityScrollY?: number;
}

const getWindowScroll = (): WindowScrollVelocity => {
  let scrollX = 0;
  let scrollY = 0;
  if (typeof window !== 'undefined') {
    scrollX = window.scrollX;
    scrollY = window.scrollY;
  }
  return {
    timeStamp: Date.now(),
    scrollX,
    scrollY,
  };
};

const useWindowScrollVelocity = () => {
  const [windowScroll, setWindowScroll] =
    useState<WindowScrollVelocity>(getWindowScroll());
  const elapsedMilliseconds = useAnimationFrame();
  const previousScroll = useRef(getWindowScroll());

  useEffect(() => {
    const currentScroll = getWindowScroll();
    const previous = previousScroll.current;
    const deltaScrollX = currentScroll.scrollX - previous.scrollX;
    const deltaScrollY = currentScroll.scrollY - previous.scrollY;
    const deltaTimeStamp = currentScroll.timeStamp - previous.timeStamp || 1;
    const velocityScrollX = deltaScrollX / deltaTimeStamp;
    const velocityScrollY = deltaScrollY / deltaTimeStamp;
    previousScroll.current = currentScroll;
    setWindowScroll({
      previousScrollX: previous.scrollX,
      previousScrollY: previous.scrollY,
      deltaScrollX,
      deltaScrollY,
      velocityScrollX,
      velocityScrollY,
      ...currentScroll,
    });
  }, [elapsedMilliseconds]);

  return windowScroll;
};

export default useWindowScrollVelocity;
