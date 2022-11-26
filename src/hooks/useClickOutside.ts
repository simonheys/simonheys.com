import { useRef, useCallback, useEffect } from 'react';

const useClickOutside = (onClickOutside: (event: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClickOutside && onClickOutside(event);
      }
    },
    [onClickOutside]
  );
  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);
  return { ref };
};

export default useClickOutside;
