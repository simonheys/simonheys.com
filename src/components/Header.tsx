import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";

import useBoundingClientRect from "../hooks/useBoundingClientRect";
import useWindowScrollVelocity from "../hooks/useWindowScrollVelocity";
import { getPageForPath } from "../modules/content";

import Link from "./ui/Link";

export interface HeaderProps {
  links: string[];
}

const Header: FC<HeaderProps> = ({ links }) => {
  const router = useRouter();
  const windowScroll = useWindowScrollVelocity();
  const { ref, boundingClientRect } = useBoundingClientRect();
  const [fixed, setFixed] = useState(false);
  const [visibleWhileScrolled, setVisibleWhileScrolled] = useState(false);

  useEffect(() => {
    if (!boundingClientRect?.height) {
      return;
    }
    if (!fixed) {
      if (windowScroll.scrollY > boundingClientRect.height) {
        setFixed(true);
      }
    } else {
      if (
        windowScroll.scrollY <= boundingClientRect.height &&
        !visibleWhileScrolled
      ) {
        setFixed(false);
      }
    }
  }, [
    boundingClientRect?.height,
    fixed,
    visibleWhileScrolled,
    windowScroll.scrollY,
  ]);

  useEffect(() => {
    if (!windowScroll.velocityScrollY) {
      return;
    }
    if (!visibleWhileScrolled) {
      if (windowScroll.velocityScrollY < -0.5 && window.scrollY > 0) {
        setVisibleWhileScrolled(true);
      }
    } else {
      if (windowScroll.velocityScrollY > 0.5 || windowScroll.scrollY <= 0) {
        setVisibleWhileScrolled(false);
      }
    }
  }, [
    visibleWhileScrolled,
    windowScroll.scrollY,
    windowScroll.velocityScrollY,
  ]);

  const navigationContainerStyle = useMemo(() => {
    if (!fixed || !boundingClientRect?.height) {
      return;
    }
    return { top: visibleWhileScrolled ? 0 : -boundingClientRect?.height };
  }, [boundingClientRect?.height, fixed, visibleWhileScrolled]);

  const activePath = useMemo(() => {
    for (const path of links) {
      const active =
        router.asPath === path || router.asPath.startsWith(`${path}/`);
      if (active) {
        return path;
      }
    }
  }, [links, router.asPath]);

  return (
    <>
      <div className="fixed right-0 top-0 m-8 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 p-3 font-mono text-xs text-white sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500">
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
        <div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
        <div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
        <div className="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
      </div>
      <div
        className={
          fixed
            ? "transition-top fixed left-0 right-0 top-0 z-10 bg-background/90 backdrop-blur-sm duration-100 ease-out"
            : ""
        }
        style={navigationContainerStyle}
      >
        <div ref={ref} className="containerAlias">
          <div className="flex justify-between py-4 text-xl font-medium text-primary sm:grid sm:grid-cols-2 sm:gap-6 sm:py-12 sm:text-2xl">
            <h1
              data-tid="title"
              className="inline-block text-primary transition-colors duration-100 hover:text-primary-hover"
            >
              <Link href="/">Simon Heys</Link>
            </h1>
            <div data-tid="navigation">
              <nav className="flex flex-row gap-4">
                {links.map((path, index) => {
                  const page = getPageForPath(path);
                  if (!page) {
                    return null;
                  }
                  const { title } = page;
                  const active = activePath === path;
                  return (
                    <Link
                      key={index}
                      href={path}
                      className={`${active ? "text-primary hover:text-primary-hover" : "text-gray-500 hover:text-gray-550 dark:text-gray-400 dark:hover:text-gray-500"} transition duration-100`}
                    >
                      {title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
