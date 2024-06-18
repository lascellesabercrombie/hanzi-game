export function SvgSearch(props: { className: string }) {
    return (
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
                strokeWidth={3}
                d="M14.954 14.946 21 21m-4-11a7 7 0 1 1-14 0 7 7 0 0 1 14 0"
            />
        </svg>
    )
}