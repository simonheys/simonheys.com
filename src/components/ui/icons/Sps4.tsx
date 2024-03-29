import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1em"
    viewBox="0 0 30 20"
    {...props}
  >
    <g fill="currentColor" fillRule="evenodd">
      <rect width={6} height={6} y={7} rx={1} />
      <rect width={6} height={6} x={8} y={7} rx={1} />
      <rect width={6} height={2} x={24} y={11} rx={1} />
      <rect width={6} height={2} x={16} y={11} rx={1} />
      <rect width={6} height={2} x={24} y={7} rx={1} />
      <rect width={6} height={2} x={16} y={7} rx={1} />
    </g>
  </svg>
);
export default SvgComponent;
