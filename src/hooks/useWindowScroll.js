import * as React from "react";

const getWindowScroll = () => {
  let scrollX = 0;
  let scrollY = 0;
  if (typeof window !== "undefined") {
    scrollX = window.scrollX;
    scrollY = window.scrollY;
  }
  return {
    scrollX,
    scrollY,
  };
};

const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = React.useState(getWindowScroll());

  const updateWindowScroll = React.useCallback(() => {
    const currentScroll = getWindowScroll();
    setWindowScroll(currentScroll);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", updateWindowScroll);
    return () => {
      window.removeEventListener("scroll", updateWindowScroll);
    };
  }, [updateWindowScroll]);

  return windowScroll;
};

export default useWindowScroll;
