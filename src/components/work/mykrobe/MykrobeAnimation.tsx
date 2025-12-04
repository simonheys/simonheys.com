import { FC } from 'react';

import AppearWhenInView from '../../ui/AppearWhenInView';
import Caption from '../../ui/Caption';
import ImageResponsive from '../../ui/ImageResponsive';

import AnimatedBackgroundCanvas from './AnimatedBackgroundCanvas';

export interface MykrobeAnimationProps {
  caption?: string;
}

const MykrobeAnimation: FC<MykrobeAnimationProps> = ({ caption }) => {
  return (
    <AppearWhenInView>
      <div className="container mb-6">
        <div className="relative h-0 w-full overflow-hidden rounded pb-[56.25%]">
          <AnimatedBackgroundCanvas />
          <div className="absolute inset-0">
            <ImageResponsive
              src="portfolio/mykrobe/mykrobe-animation-overlay.svg"
              alt="Mykrobe animation"
            />
          </div>
        </div>
      </div>
      {caption && (
        <div className="container">
          <Caption caption={caption} />
        </div>
      )}
    </AppearWhenInView>
  );
};

export default MykrobeAnimation;
