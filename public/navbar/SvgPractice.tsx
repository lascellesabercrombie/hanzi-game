import * as React from "react";
const SvgPractice = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={800}
    height={800}
    viewBox="0 0 512 512"
    {...props}
  >
    <defs>
      <path
        id="pen_svg__a"
        d="M426.667 373.333V416H0v-42.667zM186.019 91.314l96 95.999-143.352 143.354h-96v-96zM277.333 0l96 96-68.686 68.686-96-96z"
      />
    </defs>
    <use
      xlinkHref="#pen_svg__a"
      transform="translate(42.667 53.333)"
    />
  </svg>
);
export default SvgPractice;