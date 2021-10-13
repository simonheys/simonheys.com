import * as React from "react";

import useAnimationFrame from "./useAnimationFrame";

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
  if (typeof window !== "undefined") {
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
  const [windowScroll, setWindowScroll] = React.useState<WindowScrollVelocity>(
    getWindowScroll()
  );
  const elapsedMilliseconds = useAnimationFrame();
  const previousScroll = React.useRef(getWindowScroll());

  React.useEffect(() => {
    const currentScroll = getWindowScroll();
    const deltaScrollX = currentScroll.scrollX - previousScroll.current.scrollX;
    const deltaScrollY = currentScroll.scrollY - previousScroll.current.scrollY;
    const deltaTimeStamp =
      currentScroll.timeStamp - previousScroll.current.timeStamp;
    const velocityScrollX = deltaScrollX / deltaTimeStamp;
    const velocityScrollY = deltaScrollY / deltaTimeStamp;
    previousScroll.current = currentScroll;
    setWindowScroll({
      previousScrollX: previousScroll.current.scrollX,
      previousScrollY: previousScroll.current.scrollY,
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
