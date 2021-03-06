import * as React from "react";

const useClickOutside = (onClickOutside: (event: MouseEvent) => void) => {
  const ref = React.useRef(null);
  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        onClickOutside && onClickOutside(event);
      }
    },
    [onClickOutside]
  );
  React.useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);
  return { ref };
};

export default useClickOutside;
