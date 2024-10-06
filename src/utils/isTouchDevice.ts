const isTouchDevice = () => {
  if (typeof window !== 'undefined') {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigator.msMaxTouchPoints > 0
    );
  }
  return false;
};

export default isTouchDevice;
