import * as React from "react";

import AppearWhenInView from "../../ui/AppearWhenInView";
import ImageResponsive from "../../ui/ImageResponsive";
import Caption from "../../ui/Caption";
import AnimatedBackgroundCanvas from "./AnimatedBackgroundCanvas";

import styles from "./MykrobeAnimation.module.scss";

const MykrobeAnimation: React.FC = ({ caption }) => {
  return (
    <AppearWhenInView>
      <div className={"container-fluid mb-3 mb-md-4"}>
        <div className={styles.containerSizer}>
          <AnimatedBackgroundCanvas />
          <div className={styles.overlayContainer}>
            <ImageResponsive
              src={`portfolio/mykrobe/mykrobe-animation-overlay.svg`}
              alt="Mykrobe animation"
            />
          </div>
        </div>
      </div>
      {caption && (
        <div className={"container-fluid"}>
          <Caption caption={caption} />
        </div>
      )}
    </AppearWhenInView>
  );
};

export default MykrobeAnimation;
