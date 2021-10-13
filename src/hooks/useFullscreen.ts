import * as React from "react";

const useFullscreen = () => {
  const ref = React.useRef(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const onFullscreenChange = React.useCallback(() => {
    if (
      document.fullscreenElement ||
      document["mozFullScreenElement"] ||
      document["webkitFullscreenElement"]
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  }, []);

  const setRef = React.useCallback(
    (nextRef) => {
      if (ref.current) {
        ref.current.removeEventListener("fullscreenchange", onFullscreenChange);
        ref.current.removeEventListener(
          "mozfullscreenchange",
          onFullscreenChange
        );
        ref.current.removeEventListener(
          "webkitfullscreenchange",
          onFullscreenChange
        );
      }
      ref.current = nextRef;
      if (ref.current) {
        ref.current.addEventListener("fullscreenchange", onFullscreenChange);
        ref.current.addEventListener("mozfullscreenchange", onFullscreenChange);
        ref.current.addEventListener(
          "webkitfullscreenchange",
          onFullscreenChange
        );
      }
    },
    [onFullscreenChange]
  );

  const requestFullscreen = React.useCallback(() => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.mozRequestFullScreen) {
        ref.current.mozRequestFullScreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      }
    }
  }, []);

  return { ref: setRef, isFullscreen, requestFullscreen };
};

export default useFullscreen;
