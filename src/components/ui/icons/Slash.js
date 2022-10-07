import * as React from "react";

const SvgComponent = (props) => (
  <svg
    width="0.6875em"
    height="1em"
    viewBox="0 0 11 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={0.5}
      d="M.5 13l10-12"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    />
  </svg>
);

export default SvgComponent;
