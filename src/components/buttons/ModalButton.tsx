import { ButtonProps } from "./button.types"

interface ModalButtonProps extends ButtonProps {
    ariaLabel?: string,
    children: string,
    isDeleteStyle?: boolean,
}

export function ModalButton({ ariaLabel, dataTestId, isDeleteStyle = false, disabled = false, onClick, children }: ModalButtonProps) {

    const modalButtonStyle = {
        standardStyling: "border-cyan-950 text-cyan-950 hover:bg-blue-200 focus-visible:ring-cyan-950",
        deleteStyling: "border-red-700 text-red-700 hover:bg-red-700 hover:text-neutral-100 hover:border-transparent focus-visible:ring-red-700"
    }

    return (
        <button aria-disabled={disabled} data-testid={dataTestId} disabled={disabled}
            className={`inline-flex justify-center rounded-md border bg-neutral-100 drop-shadow-md hover:drop-shadow-lg active:drop-shadow-sm px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDeleteStyle ? modalButtonStyle.deleteStyling : modalButtonStyle.standardStyling}`}
            aria-label={ariaLabel} onClick={onClick}>
            {children}
        </button>
    )
}