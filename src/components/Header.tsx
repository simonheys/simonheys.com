import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';

import useBoundingClientRect from '../hooks/useBoundingClientRect';
import useWindowScrollVelocity from '../hooks/useWindowScrollVelocity';
import { getPageForPath } from '../modules/content';

import Link from './ui/Link';

import { cn } from '@/utils/cn';

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

  const style = useMemo(() => {
    if (!boundingClientRect?.height) {
      return;
    }
    if (boundingClientRect) {
      return {
        display: fixed ? 'block' : 'none',
        height: boundingClientRect.height,
      };
    }
  }, [boundingClientRect, fixed]);

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
      <div style={style}></div>
      <div
        className={cn(
          fixed &&
            'backdrop-saturate-15 transition-top fixed left-0 right-0 top-0 z-10 bg-background/85 backdrop-blur-lg duration-100 ease-out',
        )}
        style={navigationContainerStyle}
      >
        <div ref={ref} className="containerAlias">
          <div className="flex justify-between py-6 text-2xl font-medium text-primary sm:grid sm:grid-cols-2 sm:gap-6 sm:py-12">
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
                      className={`${active ? 'text-primary hover:text-primary-hover' : 'text-gray-500 hover:text-gray-550 dark:text-gray-400 dark:hover:text-gray-500'} transition duration-100`}
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
