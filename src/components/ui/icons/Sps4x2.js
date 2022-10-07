import * as React from "react";

const SvgComponent = (props) => (
  <svg
    width="1.5em"
    height="1em"
    viewBox="0 0 30 20"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <g fill="currentColor" fillRule="evenodd">
      <rect x={24} y={11} width={6} height={2} rx={1} />
      <rect x={8} y={11} width={6} height={2} rx={1} />
      <rect x={16} y={11} width={6} height={2} rx={1} />
      <rect y={11} width={6} height={2} rx={1} />
      <rect x={24} y={7} width={6} height={2} rx={1} />
      <rect x={8} y={7} width={6} height={2} rx={1} />
      <rect x={16} y={7} width={6} height={2} rx={1} />
      <rect y={7} width={6} height={2} rx={1} />
    </g>
  </svg>
);

export default SvgComponent;
