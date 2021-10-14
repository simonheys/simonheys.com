import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import VimeoPlayer from "@vimeo/player";

import styles from "./VideoFadeIn.module.scss";
import isTouchDevice from "../../utils/isTouchDevice";

export interface VideoFadeInProps {
  vimeoId: string;
  youTubeId: string;
  col: string | number;
  color: string;
  title: string;
}

const VideoFadeIn: React.FC<VideoFadeInProps> = ({
  vimeoId,
  youTubeId,
  col,
  color,
  title,
}) => {
  const ref = React.useRef(null);
  const controls = useAnimation();
  const vimeoPlayer = React.useRef(null);

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
    const aspect = col === 6 ? 1080 / 942 : 1080 / 1920;
    const style = {
      paddingBottom: `${100 * aspect}%`,
      backgroundColor: color,
    };
    return style;
  }, [col, color]);

  const overlayStyle = React.useMemo(() => {
    const style = {
      backgroundColor: color,
    };
    return style;
  }, [color]);

  if (isTouchDevice()) {
    return (
      <div className={styles.container} style={containerStyle}>
        <iframe
          title={title}
          width="100%"
          height="100%"
          src={uri}
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.container} style={containerStyle}>
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
    </div>
  );
};

export default VideoFadeIn;
