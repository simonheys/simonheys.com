import * as React from "react";
import useWindowSize from "../../hooks/useWindowSize";

import styles from "./Fill.module.scss";

const Fill = ({ children }) => {
  const windowSize = useWindowSize();
  const [style, setStyle] = React.useState({});

  React.useEffect(() => {
    setStyle({ height: windowSize.clientHeight });
  }, [windowSize.clientHeight]);

  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default Fill;
