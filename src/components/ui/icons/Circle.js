import * as React from "react";

const SvgComponent = (props) => (
  <svg
    width="0.625em"
    height="1em"
    viewBox="0 0 10 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <circle fill="currentColor" cx={5} cy={7} r={5} fillRule="evenodd" />
  </svg>
);

export default SvgComponent;
