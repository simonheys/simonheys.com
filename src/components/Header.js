import * as React from "react";
import { useRouter } from "next/router";

import * as contentModule from "../modules/content";
import useWindowScrollVelocity from "../hooks/useWindowScrollVelocity";
import useBoundingClientRect from "../hooks/useBoundingClientRect";
import LinkA from "./ui/LinkA";

import styles from "./Header.module.scss";

const Header = ({ links }) => {
  const router = useRouter();
  const windowScroll = useWindowScrollVelocity();
  const { ref, boundingClientRect } = useBoundingClientRect();
  const [fixed, setFixed] = React.useState(false);
  const [visibleWhileScrolled, setVisibleWhileScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!boundingClientRect.height) {
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
    boundingClientRect.height,
    fixed,
    visibleWhileScrolled,
    windowScroll.scrollY,
  ]);

  React.useEffect(() => {
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

  const style = React.useMemo(() => {
    if (!boundingClientRect.height) {
      return null;
    }
    if (boundingClientRect) {
      return {
        display: fixed ? "block" : "none",
        height: boundingClientRect.height,
      };
    }
  }, [boundingClientRect, fixed]);

  const navigationContainerStyle = React.useMemo(() => {
    if (!fixed || !boundingClientRect.height) {
      return null;
    }
    return { top: visibleWhileScrolled ? 0 : -boundingClientRect?.height };
  }, [boundingClientRect.height, fixed, visibleWhileScrolled]);

  return (
    <React.Fragment>
      <div className={styles.sizeContainer} style={style}></div>
      <div
        className={
          fixed ? styles.navigationContainerFixed : styles.navigationContainer
        }
        style={navigationContainerStyle}
      >
        <div ref={ref} className={"container-fluid"}>
          <div className={"row py-2 pb-md-3"}>
            <div className={"col-sm-6"}>
              <h1 className={styles.title}>
                <LinkA href="/">Simon Heys</LinkA>
              </h1>
            </div>
            <div className={"col-sm-6"}>
              {links.map((path, index) => {
                const page = contentModule.getPageForPath(path);
                const { title } = page;
                const active =
                  router.asPath === path ||
                  router.asPath.startsWith(`${path}/`);
                return (
                  <LinkA
                    key={index}
                    href={path}
                    className={active ? styles.linkActive : styles.link}
                  >
                    {title}
                  </LinkA>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.spaceContainer}></div>
    </React.Fragment>
  );
};

export default Header;
