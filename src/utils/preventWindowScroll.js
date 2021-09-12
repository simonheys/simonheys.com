const preventWindowScroll = (callback) => {
  let scrollX, scrollY;
  if (typeof window !== "undefined") {
    scrollX = window.scrollX;
    scrollY = window.scrollY;
  }
  const html = document.getElementsByTagName("html")[0];
  html.style.setProperty("scroll-behavior", "auto");
  callback();
  if (typeof window !== "undefined") {
    if (scrollY !== window.scrollY) {
      window.scrollTo(scrollX, scrollY);
    }
  }
  html.style.removeProperty("scroll-behavior");
};

export default preventWindowScroll;
