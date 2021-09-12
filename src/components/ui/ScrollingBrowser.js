import * as React from "react";

import ScrollingBrowserCell from "./ScrollingBrowserCell";

const ScrollingBrowser = (props) => {
  return (
    <div className={"container-fluid mb-3 mb-md-4"}>
      <ScrollingBrowserCell {...props} />
    </div>
  );
};

export default ScrollingBrowser;
