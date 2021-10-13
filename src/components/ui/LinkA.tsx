import * as React from "react";
import Link, { LinkProps } from "next/link";

export type LinkAType = LinkProps & {
  Tag?: any;
  // ...rest
  [x: string]: any;
};

const LinkA = ({
  Tag = "a",
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...rest
}: React.PropsWithChildren<LinkAType>) => {
  return (
    <Link
      href={href}
      passHref={Tag === "a"}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <Tag href={href} {...rest} />
    </Link>
  );
};

export default LinkA;