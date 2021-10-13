import * as React from "react";

export interface MaybeWindowSize {
  innerWidth?: number;
  innerHeight?: number;
  outerWidth?: number;
  outerHeight?: number;
  clientWidth?: number;
  clientHeight?: number;
}

const getWindowSize = (): MaybeWindowSize => {
  if (typeof window === "undefined") {
    return {};
  }
  const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
  const { clientWidth, clientHeight } = document?.documentElement ?? {};
  return {
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
    clientWidth,
    clientHeight,
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<MaybeWindowSize>(
    getWindowSize()
  );

  const updateWindowSize = React.useCallback(() => {
    setWindowSize(getWindowSize());
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [updateWindowSize]);

  return windowSize;
};

export default useWindowSize;
