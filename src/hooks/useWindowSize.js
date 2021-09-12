import * as React from "react";

const getWindowSize = () => {
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
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

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
