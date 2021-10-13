import * as React from "react";

import ScrollingBrowserCell, {
  ScrollingBrowserCellProps,
} from "./ScrollingBrowserCell";

const ScrollingBrowser = (props: ScrollingBrowserCellProps) => {
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      <ScrollingBrowserCell {...props} />
    </div>
  );
};

export default ScrollingBrowser;
