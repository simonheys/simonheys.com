import { useEffect, useRef, useState } from 'react';

const useAnimationFrame = () => {
  const [elapsed, setTime] = useState(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    let animationFrame: number;

    const onFrame = (timestamp: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }
      setTime(timestamp - startTimeRef.current);
      animationFrame = requestAnimationFrame(onFrame);
    };

    animationFrame = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return elapsed;
};

export default useAnimationFrame;
