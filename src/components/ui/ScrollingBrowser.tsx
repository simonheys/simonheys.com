import { FC } from 'react';

import ScrollingBrowserCell, {
  ScrollingBrowserCellProps,
} from './ScrollingBrowserCell';

const ScrollingBrowser: FC<ScrollingBrowserCellProps> = (props) => {
  return (
    <div className={'container-fluid mb-3 mb-md-4'}>
      <ScrollingBrowserCell {...props} />
    </div>
  );
};

export default ScrollingBrowser;
