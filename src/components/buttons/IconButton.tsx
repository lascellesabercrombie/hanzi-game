import { ButtonProps } from "./button.types"

interface IconButtonProps extends ButtonProps {
    ariaLabel: string,
    children: React.ReactElement,
    size?: number,
}

export const IconButton = ({ ariaLabel, dataTestId, disabled = false, size = 8, onClick, children }: IconButtonProps) => {
    const widthAndHeight = `w-${size} h-${size}`
    return (
        <button aria-disabled={disabled} data-testid={dataTestId} disabled={disabled} className={
            `bg-neutral-200 flex justify-center items-center ${widthAndHeight} rounded-full drop-shadow-md hover:drop-shadow-lg active:drop-shadow-sm disabled:bg-slate-600  disabled:shadow-none`
        }
            aria-label={ariaLabel} onClick={onClick}>
            {children}
        </button>
    )
}