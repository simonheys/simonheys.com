import VimeoPlayer from '@vimeo/player';
import { motion, useAnimation } from 'framer-motion';
import { FC, useState, useRef, useEffect, useMemo, useCallback } from 'react';

import useBoundingClientRectInView from '../../hooks/useBoundingClientRectInView';
import isTouchDevice from '../../utils/isTouchDevice';

import styles from './VideoFadeIn.module.scss';

export interface VideoFadeInProps {
  vimeoId?: string;
  youTubeId?: string;
  col?: number | string;
  color?: string;
  title: string;
  aspect?: string | number;
}

const VideoFadeIn: FC<VideoFadeInProps> = ({
  vimeoId,
  youTubeId,
  col,
  color,
  title,
  aspect: aspectProp,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const vimeoPlayer = useRef<VimeoPlayer | null>(null);
  const { ref: inViewRef, inView } = useBoundingClientRectInView();

  // flag to control video visibility until it is 'in view'
  // fires once only for compatibility with Vimeo player
  const [visible, setVisible] = useState(false);

  const uri = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&player_id=${vimeoId}`
    : `https://www.youtube.com/embed/${youTubeId}?muted=1&loop=1&autoplay=1&autopause=0`;

  const onLoadingComplete = useCallback(() => {
    controls.start('visible');
  }, [controls]);

  const setRef = useCallback(
    (nextRef: HTMLIFrameElement) => {
      if (ref.current && vimeoPlayer.current) {
        vimeoPlayer.current.destroy();
      }
      ref.current = nextRef;
      if (ref.current) {
        vimeoPlayer.current = new VimeoPlayer(ref.current);
        vimeoPlayer.current.on('play', onLoadingComplete);
      }
    },
    [onLoadingComplete],
  );

  const containerStyle = useMemo(() => {
    const aspect = aspectProp
      ? typeof aspectProp === 'string'
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

  const overlayStyle = useMemo(() => {
    const style = {
      backgroundColor: color,
    };
    return style;
  }, [color]);

  useEffect(() => {
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
        <>
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
        </>
      )}
    </div>
  );
};

export default VideoFadeIn;
