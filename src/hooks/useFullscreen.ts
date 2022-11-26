import { useRef, useState, useCallback } from 'react';

const useFullscreen = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onFullscreenChange = useCallback(() => {
    if (
      document.fullscreenElement ||
      document['mozFullScreenElement'] ||
      document['webkitFullscreenElement']
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  }, []);

  const setRef = useCallback(
    (nextRef: HTMLDivElement) => {
      if (ref.current) {
        ref.current.removeEventListener('fullscreenchange', onFullscreenChange);
        ref.current.removeEventListener(
          'mozfullscreenchange',
          onFullscreenChange
        );
        ref.current.removeEventListener(
          'webkitfullscreenchange',
          onFullscreenChange
        );
      }
      ref.current = nextRef;
      if (ref.current) {
        ref.current.addEventListener('fullscreenchange', onFullscreenChange);
        ref.current.addEventListener('mozfullscreenchange', onFullscreenChange);
        ref.current.addEventListener(
          'webkitfullscreenchange',
          onFullscreenChange
        );
      }
    },
    [onFullscreenChange]
  );

  const requestFullscreen = useCallback(() => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.mozRequestFullscreen) {
        ref.current.mozRequestFullscreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      }
    }
  }, []);

  return { ref: setRef, isFullscreen, requestFullscreen };
};

export default useFullscreen;
