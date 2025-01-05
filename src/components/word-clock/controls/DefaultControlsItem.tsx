import { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/utils/cn';

export interface DefaultControlsItemProps<T extends ElementType = 'div'> {
  as?: T;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

const DefaultControlsItem = <T extends ElementType = 'div'>({
  as,
  className,
  active = false,
  disabled = false,
  ...rest
}: DefaultControlsItemProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof DefaultControlsItemProps<T>>) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'my-1 rounded-xl px-3 py-2 text-xl font-medium text-gray-600',
        !disabled &&
          'cursor-pointer transition-colors duration-100 hover:text-primary',
        active && 'border-gray-200 bg-gray-500/20 text-primary',
        className,
      )}
      {...rest}
    />
  );
};

export default DefaultControlsItem;
