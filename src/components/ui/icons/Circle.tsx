import type { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="0.625em"
    height="1em"
    viewBox="0 0 10 16"
    {...props}
  >
    <circle cx={5} cy={7} r={5} fill="currentColor" fillRule="evenodd" />
  </svg>
);
export default SvgComponent;
