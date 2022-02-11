const isTouchDevice = () => {
  if (typeof window !== "undefined") {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error
      navigator.msMaxTouchPoints > 0
    );
  }
  return false;
};

export default isTouchDevice;
