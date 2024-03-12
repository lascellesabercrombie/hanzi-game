interface IconButtonProps {
    ariaLabel: string,
    disabled?: boolean,
    size?: number,
    onClick: () => void,
    children: React.ReactElement
}

export const IconButton = ({ ariaLabel, disabled = false, size = 8, onClick, children }: IconButtonProps) => {
    const widthAndHeight = `w-${size} h-${size}`
    return (
        <button aria-disabled={disabled} disabled={disabled} className={
            `bg-neutral-200 flex justify-center items-center ${widthAndHeight} rounded-full shadow-lg disabled:bg-slate-600  disabled:shadow-none`
        }
            aria-label={ariaLabel} onClick={onClick}>
            {children}
        </button>
    )
}