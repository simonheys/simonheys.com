import * as React from "react";
import Link, { LinkProps } from "next/link";

export interface LinkAProps extends LinkProps {
  Tag?: any;
  // ...rest
  [x: string]: any;
}

const LinkA: React.FC<LinkAProps> = ({
  Tag = "a",
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  target: targetProp,
  rel: relProp,
  ...rest
}) => {
  const isInternal = typeof href === "string" && href.startsWith("/");
  const target = targetProp || isInternal ? null : "_blank";
  const rel = relProp || isInternal ? null : "noreferrer";
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
      <Tag href={href} target={target} rel={rel} {...rest} />
    </Link>
  );
};

LinkA.displayName = "LinkA";

export default LinkA;
