import { FC } from "react";

import ScrollingBrowserCell, {
  ScrollingBrowserCellProps,
} from "./ScrollingBrowserCell";

const ScrollingBrowser: FC<ScrollingBrowserCellProps> = (props) => {
  return (
    <div className="container-fluid mb-md-4 mb-3">
      <ScrollingBrowserCell {...props} />
    </div>
  );
};

export default ScrollingBrowser;
