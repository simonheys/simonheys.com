import useBoundingClientRect from './useBoundingClientRect';
import useWindowSize from './useWindowSize';

const useBoundingClientRectInView = () => {
  const { ref, boundingClientRect } = useBoundingClientRect();
  const windowSize = useWindowSize();

  const inView =
    boundingClientRect && windowSize
      ? boundingClientRect.top > -boundingClientRect.height &&
        boundingClientRect.bottom <=
          windowSize.innerHeight + boundingClientRect.height
      : false;

  return { ref, boundingClientRect, inView };
};

export default useBoundingClientRectInView;
