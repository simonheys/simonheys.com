import { colord } from "colord";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { Attributes } from "graphology-types";
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useAnimationFrame from "../../../hooks/useAnimationFrame";
import useBoundingClientRectInView from "../../../hooks/useBoundingClientRectInView";

import styles from "./ExperimentCluster.module.scss";

const CANVAS_MARGIN = 50;
const MIN_RADIUS = 5;
const MAX_RADIUS = 15;

const Colors = {
  COLOR_RULE: "#ceccc6",
  COLOR_GREY_MID: "#9a9893",
  COLOR_HIGHLIGHT_EXPERIMENT_FIRST: "#FF3300",
  COLOR_HIGHLIGHT_EXPERIMENT: "#0d7da0",
  BUFF: "#f7f6f1",
};

const FontFamily = `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

export interface MaybeRenderAttributes {
  scaleGraphToCanvas?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  graphCenterX?: number;
  graphCenterY?: number;
}

export interface MaybeDragging {
  node: string;
  vx: number;
  vy: number;
}

export type ExperimentClusterType = {
  nodes: {
    id: number;
    experiments: number;
  }[];
  distance: {
    start: number;
    end: number;
    distance: number;
  }[];
};

export interface ExperimentClusterProps {
  experimentCluster: ExperimentClusterType;
}

const ExperimentCluster: FC<ExperimentClusterProps> = ({
  experimentCluster,
}) => {
  // refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const graphRef = useRef<Graph | null>(null);

  // states
  const [renderAttributes, setRenderAttributes] =
    useState<MaybeRenderAttributes>();
  const [dragging, setDragging] = useState<MaybeDragging | null>(null);

  // hooks
  const { ref, boundingClientRect, inView } = useBoundingClientRectInView();

  const elapsedMilliseconds = useAnimationFrame();

  const getRadiusForExperiments = useCallback((experiments: number) => {
    const area = experiments;
    const radius = Math.sqrt(area / Math.PI);
    return Math.min(MAX_RADIUS, MIN_RADIUS + radius * 5);
  }, []);

  useEffect(() => {
    const { nodes, distance } = experimentCluster;
    if (!nodes) {
      return;
    }

    graphRef.current = new Graph();

    // https://github.com/graphology/graphology-layout-forceatlas2#pre-requisites
    // each node must have an initial x and y
    // here we assign a random position
    // this produces a better layout than circular from testing

    nodes.forEach((node) => {
      const x = 0.1 + Math.random();
      const y = 0.1 + Math.random();
      const attributes = {
        x,
        y,
        size: getRadiusForExperiments(node.experiments),
        ...node,
      };
      graphRef.current?.addNode(node.id, attributes);
    });

    distance.forEach((distance) => {
      graphRef.current?.addEdge(distance.start, distance.end, {
        ...distance,
        weight: 1 / distance.distance,
      });
    });
  }, [experimentCluster, getRadiusForExperiments]);

  // __________________________________________________________________________________________ draw to convas

  const updateRenderAttributes = useCallback(() => {
    if (!canvasRef.current || !boundingClientRect || !graphRef.current) {
      return;
    }

    const canvasWidth = boundingClientRect.width - 2 * CANVAS_MARGIN;
    const canvasHeight = boundingClientRect.height - 2 * CANVAS_MARGIN;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    graphRef.current.forEachNode((_node, attr) => {
      const { x, y } = attr;
      minX = Math.min(x, minX);
      minY = Math.min(y, minY);
      maxX = Math.max(x, maxX);
      maxY = Math.max(y, maxY);
    });

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const graphCenterX = 0.5 * (minX + maxX);
    const graphCenterY = 0.5 * (minY + maxY);

    const canvasAspectRatio = canvasWidth / canvasHeight;
    const graphAspectRatio = graphWidth / graphHeight;

    let scaleGraphToCanvas = 1;

    if (canvasAspectRatio > graphAspectRatio) {
      // fit height
      scaleGraphToCanvas = canvasHeight / graphHeight;
    } else {
      // fit width
      scaleGraphToCanvas = canvasWidth / graphWidth;
    }

    const attributes = {
      scaleGraphToCanvas,
      canvasWidth,
      canvasHeight,
      graphCenterX,
      graphCenterY,
    };

    setRenderAttributes(attributes);
  }, [boundingClientRect]);

  useEffect(() => {
    if (!graphRef.current || !boundingClientRect) {
      return;
    }

    if (inView) {
      const sensibleSettings = forceAtlas2.inferSettings(graphRef.current);

      forceAtlas2.assign(graphRef.current, {
        iterations: 1,
        settings: {
          ...sensibleSettings,
          edgeWeightInfluence: 1,
        },
      });

      updateRenderAttributes();
    }
  }, [boundingClientRect, elapsedMilliseconds, inView, updateRenderAttributes]);

  const mapGraphToCanvas = useCallback(
    ({ x, y }: Attributes) => {
      const {
        scaleGraphToCanvas,
        canvasWidth,
        canvasHeight,
        graphCenterX,
        graphCenterY,
      } = renderAttributes || {};
      if (
        !canvasWidth ||
        !canvasHeight ||
        !graphCenterX ||
        !graphCenterY ||
        !scaleGraphToCanvas
      ) {
        return { x: 0, y: 0 };
      }
      const canvasX =
        CANVAS_MARGIN +
        canvasWidth * 0.5 +
        (x - graphCenterX) * scaleGraphToCanvas;
      const canvasY =
        CANVAS_MARGIN +
        canvasHeight * 0.5 -
        (y - graphCenterY) * scaleGraphToCanvas;
      return { x: canvasX, y: canvasY };
    },
    [renderAttributes],
  );

  const mapCanvasToGraph = useCallback(
    ({ x, y }: Attributes) => {
      if (!renderAttributes) {
        return { x: 0, y: 0 };
      }
      const {
        scaleGraphToCanvas,
        canvasWidth,
        canvasHeight,
        graphCenterX,
        graphCenterY,
      } = renderAttributes || {};
      if (
        !canvasWidth ||
        !canvasHeight ||
        !graphCenterX ||
        !graphCenterY ||
        !scaleGraphToCanvas
      ) {
        return { x: 0, y: 0 };
      }
      const graphX =
        (x - CANVAS_MARGIN - canvasWidth * 0.5) / scaleGraphToCanvas +
        graphCenterX;
      const graphY =
        (y - CANVAS_MARGIN - canvasHeight * 0.5) / -scaleGraphToCanvas +
        graphCenterY;
      return { x: graphX, y: graphY };
    },
    [renderAttributes],
  );

  const findNodeForCanvasCoordinates = useCallback(
    ({ x, y }: Attributes) => {
      if (!graphRef.current) {
        return;
      }
      const nodes = graphRef.current.nodes();
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const attributes = graphRef.current.getNodeAttributes(node);
        const canvasXY = mapGraphToCanvas({ x: attributes.x, y: attributes.y });
        const vx = x - canvasXY.x;
        const vy = y - canvasXY.y;
        const d = Math.sqrt(vx * vx + vy * vy);
        if (d <= 10) {
          return { node, attributes, vx, vy, d };
        }
      }
    },
    [mapGraphToCanvas],
  );

  const canvasXYForMouseEvent = useCallback((e: MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    return { x, y };
  }, []);

  const findNodeForMouseEvent = useCallback(
    (e: MouseEvent) => {
      const { x, y } = canvasXYForMouseEvent(e);
      const result = findNodeForCanvasCoordinates({ x, y });
      return result;
    },
    [canvasXYForMouseEvent, findNodeForCanvasCoordinates],
  );

  useEffect(() => {
    if (
      !canvasRef.current ||
      !renderAttributes ||
      !boundingClientRect ||
      !graphRef.current
    ) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    const scale = window?.devicePixelRatio || 1;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(scale, scale);

    context.clearRect(
      0,
      0,
      boundingClientRect.width,
      boundingClientRect.height,
    );

    graphRef.current.forEachEdge(
      (
        _edge,
        attributes,
        _source,
        _target,
        sourceAttributes,
        targetAttributes,
      ) => {
        const sourceXY = mapGraphToCanvas(sourceAttributes);
        const targetXY = mapGraphToCanvas(targetAttributes);

        context.strokeStyle = Colors.COLOR_RULE;
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(sourceXY.x, sourceXY.y);
        context.lineTo(targetXY.x, targetXY.y);
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `11px ${FontFamily}`;

        context.strokeStyle = Colors.BUFF;
        context.lineWidth = 4;
        context.strokeText(
          `${attributes.distance}`,
          0.5 * (sourceXY.x + targetXY.x),
          0.5 * (sourceXY.y + targetXY.y),
        );

        context.fillStyle = Colors.COLOR_GREY_MID;
        context.fillText(
          `${attributes.distance}`,
          0.5 * (sourceXY.x + targetXY.x),
          0.5 * (sourceXY.y + targetXY.y),
        );
      },
    );

    graphRef.current.forEachNode((_node, attributes) => {
      const { x, y } = mapGraphToCanvas(attributes);
      const r = getRadiusForExperiments(attributes.experiments);

      context.fillStyle = Colors.COLOR_GREY_MID;
      context.beginPath();
      context.arc(x, y, 1.5, 0, 2 * Math.PI, true);
      context.closePath();
      context.fill();

      const color = Colors.COLOR_HIGHLIGHT_EXPERIMENT;

      context.fillStyle = colord(color).alpha(0.2).toRgbString();
      context.strokeStyle = color;
      context.lineWidth = 0.5;

      context.beginPath();
      context.arc(x, y, r, 0, 2 * Math.PI, true);
      context.closePath();
      context.fill();
      context.stroke();
    });
  }, [
    mapGraphToCanvas,
    elapsedMilliseconds,
    renderAttributes,
    getRadiusForExperiments,
    boundingClientRect?.width,
    boundingClientRect?.height,
    boundingClientRect,
  ]);

  // __________________________________________________________________________________________ mouse events

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging && graphRef.current) {
        const { x, y } = canvasXYForMouseEvent(e);
        const graphXY = mapCanvasToGraph({ x, y });
        const { node, vx, vy } = dragging;
        if (vx === undefined || vy === undefined) {
          return;
        }
        graphRef.current.updateNode(node, (attributes) => {
          return {
            ...attributes,
            x: graphXY.x - vx,
            y: graphXY.y - vy,
            fixed: true,
          };
        });
      }
    },
    [dragging, canvasXYForMouseEvent, mapCanvasToGraph],
  );

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const result = findNodeForMouseEvent(e);
      if (result && graphRef.current) {
        const { node, vx, vy } = result;
        graphRef.current.updateNode(node, (attributes) => {
          return {
            ...attributes,
            fixed: true,
          };
        });
        setDragging({ node, vx, vy });
      }
    },
    [findNodeForMouseEvent],
  );

  const stopDragWithEvent = useCallback(
    (_e: MouseEvent) => {
      if (dragging && graphRef.current) {
        const { node } = dragging;
        graphRef.current.updateNode(node, (attributes) => {
          return {
            ...attributes,
            fixed: false,
          };
        });
        setDragging(null);
      }
    },
    [dragging, setDragging, graphRef],
  );

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      stopDragWithEvent(e);
    },
    [stopDragWithEvent],
  );

  const onMouseOut = useCallback(
    (e: MouseEvent) => {
      stopDragWithEvent(e);
    },
    [stopDragWithEvent],
  );

  // __________________________________________________________________________________________ canvas attributes

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

  // __________________________________________________________________________________________ render

  return (
    <div ref={ref} className={styles.container}>
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        {...canvasProps}
      />
    </div>
  );
};

export default ExperimentCluster;
