import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.5em"
    height="1em"
    viewBox="0 0 8 16"
    {...props}
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth={1.25}
      d="m1 5 3 3 3-3"
    />
  </svg>
);
export default SvgComponent;
