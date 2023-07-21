import { FC, useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import preventWindowScroll from '../../../utils/preventWindowScroll';
import AppearWhenInView from '../../ui/AppearWhenInView';
import Caption from '../../ui/Caption';
import SegmentedControl from '../../ui/SegmentedControl';
import { CardItemPostType } from './CardItem';
import CardsCollectionBlock, {
  mapLayoutPropToLayout,
} from './CardsCollectionBlock';
import styles from './SPSCollection.module.scss';

const collection: CardItemPostType[] = require('./json/collection.json');

type Key = keyof typeof mapLayoutPropToLayout;

const orderedValues: Key[] = ['4of2', 4, '4over4', '3over4', '2over4'];

const options = orderedValues.map((value) => {
  return {
    title: mapLayoutPropToLayout[value].title,
    value,
  };
});

export interface SPSCollectionProps {
  caption?: string;
}

const SPSCollection: FC<SPSCollectionProps> = ({ caption }) => {
  const [layout, setLayout] = useState<Key>(orderedValues[0]);
  const [autoAnimate, setAutoAnimate] = useState(true);
  const { ref, inView } = useInView();

  const changeLayout = useCallback((value: Key) => {
    // FIXME: workaround for strange bug in Chrome / FireFox where
    // the scroll position bounces on layout change
    // investigated but was unable to fix with any CSS changes
    preventWindowScroll(() => {
      setLayout(value);
    });
  }, []);

  const onChange = useCallback(
    (value: string | number) => {
      if (autoAnimate) {
        setAutoAnimate(false);
      }
      changeLayout(value as Key);
    },
    [autoAnimate, changeLayout],
  );

  const autoChangeLayout = useCallback(() => {
    const selectedIndex = options.findIndex((item) => item.value === layout);
    const nextIndex = (selectedIndex + 1) % options.length;
    changeLayout(options[nextIndex].value);
  }, [changeLayout, layout]);

  useEffect(() => {
    if (inView && autoAnimate) {
      const intervalId = setInterval(autoChangeLayout, 1000);
      return () => clearInterval(intervalId);
    }
  }, [autoAnimate, autoChangeLayout, inView]);

  return (
    <AppearWhenInView>
      <div className={'container-fluid mb-3 mb-md-4'}>
        <div className={styles.containerSizer}>
          <div ref={ref} className={styles.container}>
            <div className={styles.collectionContainer}>
              <CardsCollectionBlock
                posts={collection}
                layout={layout}
                animated
              />
            </div>
            <div className={styles.segmentedControlContainer}>
              <SegmentedControl
                options={options}
                value={layout}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <div className={'container-fluid'}>
          <Caption caption={caption} />
        </div>
      )}
    </AppearWhenInView>
  );
};

export default SPSCollection;
