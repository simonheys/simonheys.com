import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType } from "react";

import styles from "./DefaultControlsItem.module.scss";

export interface DefaultControlsItemProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

const DefaultControlsItem = <T extends ElementType = "div">({
  as,
  className,
  active = false,
  disabled = false,
  ...rest
}: DefaultControlsItemProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof DefaultControlsItemProps<T>>) => {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        disabled
          ? styles.containerDisabled
          : active
            ? styles.containerActive
            : styles.container,
        className,
      )}
      {...rest}
    />
  );
};

export default DefaultControlsItem;
