const SvgNext = (props: { className: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9 6 6 6-6 6"
        />
    </svg>
);
export default SvgNext;