import * as React from "react";

import AppearWhenInView from "../../ui/AppearWhenInView";
import ImageResponsive from "../../ui/ImageResponsive";
import AnimatedBackgroundCanvas from "./AnimatedBackgroundCanvas";

import styles from "./MykrobeAnimation.module.scss";

const MykrobeAnimation: React.FC = () => {
  return (
    <AppearWhenInView>
      <div className={"container-fluid mb-3 mb-md-4"}>
        <div className={styles.containerSizer}>
          <AnimatedBackgroundCanvas />
          <div className={styles.overlayContainer}>
            <ImageResponsive
              src={`work/mykrobe/mykrobe-animation-overlay.svg`}
              alt="Mykrobe animation"
            />
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default MykrobeAnimation;
