import * as React from "react";
import clsx from "clsx";

import styles from "./DefaultControlsItem.module.scss";

export interface DefaultControlsItemProps {
  className?: string;
  Tag?: any;
  active?: boolean;
  disabled?: boolean;
  // ...rest
  [x: string]: any;
}

const DefaultControlsItem: React.FC<DefaultControlsItemProps> = ({
  className,
  Tag = "div",
  active = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Tag
      className={clsx(
        disabled
          ? styles.containerDisabled
          : active
          ? styles.containerActive
          : styles.container,
        className
      )}
      {...rest}
    ></Tag>
  );
};

export default DefaultControlsItem;
