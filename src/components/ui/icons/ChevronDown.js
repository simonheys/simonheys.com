import * as React from "react";

const SvgComponent = (props) => (
  <svg
    width="0.5em"
    height="1em"
    viewBox="0 0 8 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.25}
      d="m1 5 3 3 3-3"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    />
  </svg>
);

export default SvgComponent;
