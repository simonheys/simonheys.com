import { FC, useEffect, useMemo, useRef } from "react";

import useAnimationFrame from "../../../hooks/useAnimationFrame";
import useBoundingClientRectInView from "../../../hooks/useBoundingClientRectInView";

import styles from "./AnimatedBackgroundCanvas.module.scss";
import { CanvasLozenge } from "./CanvasLozenge";
import { LOZENGE_COLORS, LOZENGES_PER_COLOR } from "./constants";

const AnimatedBackgroundCanvas: FC = () => {
  const lozenges = useRef<CanvasLozenge[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref, boundingClientRect, inView } = useBoundingClientRectInView();
  const elapsedMilliseconds = useAnimationFrame();
  const containerWidth = 1920;
  const containerHeight = 1080;

  useEffect(() => {
    if (!boundingClientRect?.width || lozenges.current) {
      return;
    }
    const containerScale = boundingClientRect.width / containerWidth;
    lozenges.current = [];
    for (let j = 0; j < LOZENGE_COLORS.length; j++) {
      const color = LOZENGE_COLORS[j];
      for (let i = 0; i < LOZENGES_PER_COLOR; i++) {
        const l = new CanvasLozenge({
          containerWidth,
          containerHeight,
          containerScale,
          color,
        });
        lozenges.current.push(l);
      }
    }
  }, [boundingClientRect?.width]);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !lozenges.current ||
      !boundingClientRect?.width ||
      !inView
    ) {
      return;
    }

    const containerScale = boundingClientRect.width / containerWidth;

    const context = canvasRef.current.getContext("2d", { alpha: false });
    if (!context || !containerScale) {
      return;
    }
    const scale = window?.devicePixelRatio || 1;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(scale, scale);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#f7f6f1";
    context.fillRect(0, 0, boundingClientRect.width, boundingClientRect.height);
    context.globalCompositeOperation = "multiply";
    lozenges.current.forEach((lozenge) => {
      lozenge.setProps({
        containerScale,
      });
      lozenge.onEnterFrame();
      lozenge.renderInContext(context);
    });
  }, [
    elapsedMilliseconds,
    boundingClientRect?.height,
    boundingClientRect?.width,
    inView,
  ]);

  const canvasProps = useMemo(() => {
    if (!boundingClientRect?.width) {
      return;
    }
    const scale = window?.devicePixelRatio || 1;
    const canvasProps = {
      width: boundingClientRect.width * scale,
      height: boundingClientRect.height * scale,
      style: {
        width: `${boundingClientRect.width}px`,
        height: `${boundingClientRect.height}px`,
      },
    };
    return canvasProps;
  }, [boundingClientRect?.height, boundingClientRect?.width]);

  return (
    <div ref={ref} className={styles.container}>
      <canvas ref={canvasRef} {...canvasProps} />
    </div>
  );
};

export default AnimatedBackgroundCanvas;
