import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width="0.5em"
      height="1em"
      viewBox="0 0 8 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={1.25}
        d="M1 5l3 3 3-3"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default SvgComponent;
