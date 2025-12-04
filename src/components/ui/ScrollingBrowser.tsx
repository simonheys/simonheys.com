import { FC } from 'react';

import ScrollingBrowserCell, {
  ScrollingBrowserCellProps,
} from './ScrollingBrowserCell';

const ScrollingBrowser: FC<ScrollingBrowserCellProps> = (props) => {
  return (
    <div className="container mb-6">
      <ScrollingBrowserCell {...props} />
    </div>
  );
};

export default ScrollingBrowser;
