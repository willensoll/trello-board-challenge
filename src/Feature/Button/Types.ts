export interface ButtonProps {
    onClick: () => void;
    isDisabled?: boolean;
    buttonText?: string;
    style?: React.CSSProperties;
}