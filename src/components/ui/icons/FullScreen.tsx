import type { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path stroke="currentColor" strokeWidth={1.5} d="m7 9-6 6" />
      <path fill="currentColor" d="M0 10h1.5v6H0z" />
      <path fill="currentColor" d="M0 14.5h6V16H0z" />
      <path stroke="currentColor" strokeWidth={1.5} d="m9 7 6-6" />
      <path fill="currentColor" d="M16 6h-1.5V0H16z" />
      <path fill="currentColor" d="M16 1.5h-6V0h6z" />
    </g>
  </svg>
);
export default SvgComponent;
