import { FC, PropsWithChildren, useEffect, useState } from 'react';

import useWindowSize from '../../hooks/useWindowSize';

const Fill: FC<PropsWithChildren> = ({ children }) => {
  const windowSize = useWindowSize();
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({ height: windowSize?.clientHeight });
  }, [windowSize?.clientHeight]);

  return (
    <div className="flex flex-col md:mb-0" style={style}>
      {children}
    </div>
  );
};

export default Fill;
