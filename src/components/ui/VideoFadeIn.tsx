import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import VimeoPlayer from "@vimeo/player";

import styles from "./VideoFadeIn.module.scss";
import isTouchDevice from "../../utils/isTouchDevice";
import useBoundingClientRectInView from "../../hooks/useBoundingClientRectInView";

export interface VideoFadeInProps {
  vimeoId: string;
  youTubeId: string;
  col: string | number;
  color: string;
  title: string;
  aspect?: string | number;
}

const VideoFadeIn: React.FC<VideoFadeInProps> = ({
  vimeoId,
  youTubeId,
  col,
  color,
  title,
  aspect: aspectProp,
}) => {
  const ref = React.useRef(null);
  const controls = useAnimation();
  const vimeoPlayer = React.useRef(null);
  const { ref: inViewRef, inView } = useBoundingClientRectInView();

  // flag to control video visibility until it is 'in view'
  // fires once only for compatibility with Vimeo player
  const [visible, setVisible] = React.useState(false);

  const uri = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&player_id=${vimeoId}`
    : `https://www.youtube.com/embed/${youTubeId}?muted=1&loop=1&autoplay=1&autopause=0`;

  const onLoadingComplete = React.useCallback(() => {
    controls.start("visible");
  }, [controls]);

  const setRef = React.useCallback(
    (nextRef) => {
      if (ref.current && vimeoPlayer.current) {
        vimeoPlayer.current.destroy();
      }
      ref.current = nextRef;
      if (ref.current) {
        vimeoPlayer.current = new VimeoPlayer(ref.current);
        vimeoPlayer.current.on("play", onLoadingComplete);
      }
    },
    [onLoadingComplete]
  );

  const containerStyle = React.useMemo(() => {
    const aspect = aspectProp
      ? typeof aspectProp === "string"
        ? parseFloat(aspectProp)
        : aspectProp
      : col === 6
      ? 1080 / 942
      : 1080 / 1920;
    const style = {
      paddingBottom: `${100 * aspect}%`,
      backgroundColor: color,
    };
    return style;
  }, [aspectProp, col, color]);

  const overlayStyle = React.useMemo(() => {
    const style = {
      backgroundColor: color,
    };
    return style;
  }, [color]);

  React.useEffect(() => {
    if (!visible && inView) {
      setVisible(true);
    }
  }, [inView, visible]);

  if (isTouchDevice()) {
    return (
      <div ref={inViewRef} className={styles.container} style={containerStyle}>
        {visible && (
          <iframe
            title={title}
            width="100%"
            height="100%"
            src={uri}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  return (
    <div ref={inViewRef} className={styles.container} style={containerStyle}>
      {visible && (
        <React.Fragment>
          <iframe
            ref={setRef}
            title={title}
            width="100%"
            height="100%"
            src={uri}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
          <motion.div
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 0 },
              hidden: { opacity: 1 },
            }}
          >
            <div className={styles.overlay} style={overlayStyle}></div>
          </motion.div>
        </React.Fragment>
      )}
    </div>
  );
};

export default VideoFadeIn;
