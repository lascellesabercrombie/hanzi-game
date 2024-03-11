const SvgDelete = (props: { className: string, key?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="-0.5 0 19 19"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M4.917 14.889c0 .468.687 1.111 1.146 1.111h6.875c.458 0 1.145-.643 1.145-1.111V6H4.917zM15 3.465h-2.444L11.333 2H7.667L6.444 3.465H4V4.93h11z"
    />
  </svg>
);
export default SvgDelete;