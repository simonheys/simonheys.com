import { useCallback, useEffect, useState } from 'react';

export interface WindowSize
  extends Pick<
      Window,
      'innerWidth' | 'innerHeight' | 'outerWidth' | 'outerHeight'
    >,
    Pick<HTMLElement, 'clientWidth' | 'clientHeight'> {}

const getWindowSize = (): WindowSize | null => {
  if (typeof window === 'undefined') {
    return null;
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
  const [windowSize, setWindowSize] = useState<WindowSize | null>(
    getWindowSize(),
  );

  const updateWindowSize = useCallback(() => {
    setWindowSize(getWindowSize());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [updateWindowSize]);

  return windowSize;
};

export default useWindowSize;
