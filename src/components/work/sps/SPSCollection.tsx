'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import preventWindowScroll from '../../../utils/preventWindowScroll';
import AppearWhenInView from '../../ui/AppearWhenInView';
import Caption from '../../ui/Caption';
import SegmentedControl from '../../ui/SegmentedControl';

import { CardItemPostType } from './CardItem';
import CardsCollectionBlock, {
  mapLayoutPropToLayout,
} from './CardsCollectionBlock';

// eslint-disable-next-line @typescript-eslint/no-require-imports
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
      <div className="containerAlias mb-md-4 mb-3">
        <div className="relative h-0 w-full pb-[75%] sm:pb-[56.25%]">
          <div
            ref={ref}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded bg-gray-100 text-gray-700"
          >
            <div className="flex max-w-[1020px] flex-1 items-center justify-center px-1 text-[33%] sm:px-2 sm:text-[50%] md:text-[66.67%] xl:text-[100%]">
              <CardsCollectionBlock
                posts={collection}
                layout={layout}
                animated
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 m-2 flex flex-col items-center sm:m-4">
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
        <div className="containerAlias">
          <Caption caption={caption} />
        </div>
      )}
    </AppearWhenInView>
  );
};

export default SPSCollection;
