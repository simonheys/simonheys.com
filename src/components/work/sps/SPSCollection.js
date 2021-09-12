import * as React from "react";
import { useInView } from "react-intersection-observer";

import AppearWhenInView from "../../ui/AppearWhenInView";
import SegmentedControl from "../../ui/SegmentedControl";
import preventWindowScroll from "../../../utils/preventWindowScroll";

import CardsCollectionBlock, {
  mapLayoutPropToLayout,
} from "./CardsCollectionBlock";

import styles from "./SPSCollection.module.scss";

const collection = require("./json/collection.json");

const orderedValues = ["4of2", "4", "4over4", "3over4", "2over4"];

const options = orderedValues.map((value) => {
  return {
    title: mapLayoutPropToLayout[value].title,
    value,
  };
});

const SPSCollection = () => {
  const [layout, setLayout] = React.useState(orderedValues[0]);
  const [autoAnimate, setAutoAnimate] = React.useState(true);
  const { ref, inView } = useInView();

  const changeLayout = React.useCallback((value) => {
    // FIXME: workaround for strange bug in Chrome / FireFox where
    // the scroll position bounces on layout change
    // investigated but was unable to fix with any CSS changes
    preventWindowScroll(() => {
      setLayout(value);
    });
  }, []);

  const onChange = React.useCallback(
    (value) => {
      if (autoAnimate) {
        setAutoAnimate(false);
      }
      changeLayout(value);
    },
    [autoAnimate, changeLayout]
  );

  const autoChangeLayout = React.useCallback(() => {
    const selectedIndex = options.findIndex((item) => item.value === layout);
    const nextIndex = (selectedIndex + 1) % options.length;
    changeLayout(options[nextIndex].value);
  }, [changeLayout, layout]);

  React.useEffect(() => {
    if (inView && autoAnimate) {
      const intervalId = setInterval(autoChangeLayout, 1000);
      return () => clearInterval(intervalId);
    }
  }, [autoAnimate, autoChangeLayout, inView]);

  return (
    <AppearWhenInView>
      <div className={"container-fluid mb-3 mb-md-4"}>
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
    </AppearWhenInView>
  );
};

export default SPSCollection;
