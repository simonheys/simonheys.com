import type { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.6875em"
    height="1em"
    viewBox="0 0 11 16"
    {...props}
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth={0.5}
      d="m.5 13 10-12"
    />
  </svg>
);
export default SvgComponent;
