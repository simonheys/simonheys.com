import { FC } from "react";

import AppearWhenInView from "../../ui/AppearWhenInView";
import Caption from "../../ui/Caption";
import ImageResponsive from "../../ui/ImageResponsive";

import AnimatedBackgroundCanvas from "./AnimatedBackgroundCanvas";
import styles from "./MykrobeAnimation.module.scss";

export interface MykrobeAnimationProps {
  caption?: string;
}

const MykrobeAnimation: FC<MykrobeAnimationProps> = ({ caption }) => {
  return (
    <AppearWhenInView>
      <div className="container-fluid mb-md-4 mb-3">
        <div className={styles.containerSizer}>
          <AnimatedBackgroundCanvas />
          <div className={styles.overlayContainer}>
            <ImageResponsive
              src="portfolio/mykrobe/mykrobe-animation-overlay.svg"
              alt="Mykrobe animation"
            />
          </div>
        </div>
      </div>
      {caption && (
        <div className="container-fluid">
          <Caption caption={caption} />
        </div>
      )}
    </AppearWhenInView>
  );
};

export default MykrobeAnimation;
