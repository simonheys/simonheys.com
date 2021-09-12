import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width="1.5em"
      height="1em"
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <rect y={11} width={6} height={6} rx={1} />
        <rect x={8} y={11} width={6} height={6} rx={1} />
        <rect y={3} width={14} height={6} rx={1} />
        <rect x={16} y={3} width={14} height={6} rx={1} />
        <rect x={24} y={15} width={6} height={2} rx={1} />
        <rect x={16} y={15} width={6} height={2} rx={1} />
        <rect x={16} y={11} width={6} height={2} rx={1} />
        <rect x={24} y={11} width={6} height={2} rx={1} />
      </g>
    </svg>
  );
}

export default SvgComponent;
