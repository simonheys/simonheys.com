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
      <rect y={11} width={6} height={6} rx={1} />
      <rect x={8} y={11} width={6} height={6} rx={1} />
      <rect y={3} width={8.67} height={6} rx={1} />
      <rect x={10.665} y={3} width={8.67} height={6} rx={1} />
      <rect x={21.33} y={3} width={8.67} height={6} rx={1} />
      <rect x={24} y={15} width={6} height={2} rx={1} />
      <rect x={16} y={15} width={6} height={2} rx={1} />
      <rect x={16} y={11} width={6} height={2} rx={1} />
      <rect x={24} y={11} width={6} height={2} rx={1} />
    </g>
  </svg>
);

export default SvgComponent;
