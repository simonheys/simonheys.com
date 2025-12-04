import NextLink from 'next/link';
import { ComponentProps, FC } from 'react';

export interface LinkProps extends ComponentProps<typeof NextLink> {}

const Link: FC<LinkProps> = ({
  href,
  target: targetProp,
  rel: relProp,
  ...rest
}) => {
  const isInternal = typeof href === 'string' && href.startsWith('/');
  const target = targetProp ?? (isInternal ? undefined : '_blank');
  const rel = relProp ?? (isInternal ? undefined : 'noreferrer');
  return <NextLink href={href} target={target} rel={rel} {...rest} />;
};

export default Link;
