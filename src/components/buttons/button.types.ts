export interface ButtonProps {
    dataTestId: string,
    disabled?: boolean,
    onClick: () => void,
    children: React.ReactElement | string
}