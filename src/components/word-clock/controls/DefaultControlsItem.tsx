import * as React from "react";
import clsx from "clsx";

import styles from "./DefaultControlsItem.module.scss";

export type DefaultControlsItemProps = {
  className?: string;
  tag: React.ComponentType | string;
  active: boolean;
  disabled: boolean;
};

const DefaultControlsItem = ({
  className,
  tag: Tag = "div",
  active = false,
  disabled = false,
  ...rest
}: DefaultControlsItemProps) => {
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
