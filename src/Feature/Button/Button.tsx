import {ButtonProps} from "./Types";

const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginTop: "10px"
}

export const Button: React.FC<ButtonProps> = ({onClick, isDisabled, buttonText, style}) => {
    return (
        <button style={style? {...buttonStyle,...style} : buttonStyle} onClick={onClick} disabled={isDisabled}>
            {buttonText ? buttonText : "Confirm"}
        </button>
    );
};

