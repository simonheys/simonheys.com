import * as React from "react";
import dynamic from "next/dynamic";

// fundamental page structure is static
// this allows DOM to build, size and scroll as expected
import Header from "./Header";
import Footer from "./Footer";
import WorkGrid from "./work/grid/WorkGrid";
import WorkHeader from "./work/WorkHeader";
import WorkRow from "./work/WorkRow";
import ScrollingBrowser from "./ui/ScrollingBrowser";
import ScrollingBrowserCell from "./ui/ScrollingBrowserCell";
import WorkNext from "./work/WorkNext";

// unique components are dynamic
const MykrobeAnimation = dynamic(() =>
  import("./work/mykrobe/MykrobeAnimation")
);
const MykrobeCluster = dynamic(() => import("./work/mykrobe/MykrobeCluster"));
const SPSCollection = dynamic(() => import("./work/sps/SPSCollection"));
const WordClockEditable = dynamic(() =>
  import("./word-clock/WordClockEditable")
);
const WordClockCell = dynamic(() => import("./word-clock/WordClockCell"));
const WordClockFill = dynamic(() => import("./word-clock/WordClockFill"));

const MapTypeToComponent = {
  "mykrobe-animation": MykrobeAnimation,
  "mykrobe-cluster": MykrobeCluster,
  "scrolling-browser-cell": ScrollingBrowserCell,
  "scrolling-browser": ScrollingBrowser,
  "sps-collection": SPSCollection,
  "word-clock-editable": WordClockEditable,
  "word-clock-fill": WordClockFill,
  "word-clock-cell": WordClockCell,
  "work-grid": WorkGrid,
  "work-header": WorkHeader,
  "work-next": WorkNext,
  "work-row": WorkRow,
  footer: Footer,
  header: Header,
};

export const MappedComponent = ({ type, ...rest }) => {
  const Component = MapTypeToComponent[type];
  if (Component) {
    return <Component {...rest} />;
  }
  return null;
};

const Components = ({ components }) => {
  return components.map((props, index) => {
    return <MappedComponent key={index} {...props} />;
  });
};

export default Components;
