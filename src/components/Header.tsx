import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";

import useBoundingClientRect from "../hooks/useBoundingClientRect";
import useWindowScrollVelocity from "../hooks/useWindowScrollVelocity";
import { getPageForPath } from "../modules/content";

import styles from "./Header.module.scss";
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

  const style = useMemo(() => {
    if (!boundingClientRect?.height) {
      return;
    }
    if (boundingClientRect) {
      return {
        display: fixed ? "block" : "none",
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
      <div className={styles.sizeContainer} style={style}></div>
      <div
        className={
          fixed ? styles.navigationContainerFixed : styles.navigationContainer
        }
        style={navigationContainerStyle}
      >
        <div ref={ref} className="container-fluid">
          <div className="row justify-content-between justify-content-md-end py-md-5 py-4">
            <div className="col">
              <h1 data-tid="title" className={styles.title}>
                <Link href="/">Simon Heys</Link>
              </h1>
            </div>
            <div className="col" data-tid="navigation">
              <div className={styles.linksContainer}>
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
                      className={active ? styles.linkActive : styles.link}
                    >
                      {title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.spaceContainer}></div>
    </>
  );
};

export default Header;
