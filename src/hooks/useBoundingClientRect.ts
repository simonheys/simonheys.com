import { useRef, useState, useCallback, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useBoundingClientRect = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [boundingClientRect, setBoundingClientRect] =
    useState<DOMRectReadOnly | null>(null);

  const updateBoundingClientRect = useCallback(() => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      setBoundingClientRect(rect);
    }
  }, []);

  const setRef = useCallback(
    (nextRef: HTMLDivElement) => {
      if (ref?.current) {
        resizeObserver.current && resizeObserver.current.unobserve(ref.current);
      }
      ref.current = nextRef;
      if (ref?.current) {
        updateBoundingClientRect();
        resizeObserver.current && resizeObserver.current.observe(ref.current);
      }
    },
    [updateBoundingClientRect],
  );

  useEffect(() => {
    window.addEventListener('resize', updateBoundingClientRect);
    window.addEventListener('scroll', updateBoundingClientRect);
    resizeObserver.current = new ResizeObserver((entries) => {
      if (ref?.current) {
        const currentRefEntry = entries.find(
          ({ target }) => target === ref.current,
        );
        if (currentRefEntry) {
          updateBoundingClientRect();
        }
      }
    });
    if (ref?.current) {
      resizeObserver.current.observe(ref.current);
    }
    return () => {
      window.removeEventListener('resize', updateBoundingClientRect);
      window.removeEventListener('scroll', updateBoundingClientRect);
      resizeObserver.current?.disconnect();
      resizeObserver.current = null;
    };
  }, [updateBoundingClientRect]);

  return { ref: setRef, useRef: ref, boundingClientRect };
};

export default useBoundingClientRect;
