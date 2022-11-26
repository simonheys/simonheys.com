import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="0.6875em"
    height="1em"
    viewBox="0 0 11 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={0.5}
      d="m.5 13 10-12"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    />
  </svg>
);
export default SvgComponent;
