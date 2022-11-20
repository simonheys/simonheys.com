import { useState, useCallback, useEffect } from "react";

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
  const [windowScroll, setWindowScroll] = useState(getWindowScroll());

  const updateWindowScroll = useCallback(() => {
    const currentScroll = getWindowScroll();
    setWindowScroll(currentScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateWindowScroll);
    return () => {
      window.removeEventListener("scroll", updateWindowScroll);
    };
  }, [updateWindowScroll]);

  return windowScroll;
};

export default useWindowScroll;
