import * as React from "react";

const SvgComponent = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path stroke="currentColor" strokeWidth={1.5} d="M7 9l-6 6" />
      <path fill="currentColor" d="M0 10h1.5v6H0z" />
      <path fill="currentColor" d="M0 14.5h6V16H0z" />
      <g>
        <path stroke="currentColor" strokeWidth={1.5} d="M9 7l6-6" />
        <path fill="currentColor" d="M16 6h-1.5V0H16z" />
        <path fill="currentColor" d="M16 1.5h-6V0h6z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
