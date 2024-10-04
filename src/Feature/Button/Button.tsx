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

const Button: React.FC<ButtonProps> = ({onClick, isDisabled, buttonText}) => {
    return (
        <button style={buttonStyle} onClick={onClick} disabled={isDisabled}>
            {buttonText ? buttonText : "Confirm"}
        </button>
    );
};

export default Button;