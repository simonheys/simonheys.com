import Link from "next/link";

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
}) => {
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
