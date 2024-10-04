import { useEffect, useRef } from "react";
import { ModalProps } from "./ModalProps";
import ReactDOM from "react-dom";

const modalOverlayStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
    backgroundColor: "#6f9582",
    border: "2px solid rgb(240, 240, 240)",
    borderRadius: "12px",
    position: "absolute",
    width: "50%",
    top: "25%",
    left: "25%",
    bottom: "25%",
};

const modalContentStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#6f9582",
    color: "black",
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
};

export const Modal: React.FC<ModalProps> = ({ onClose, isOpen, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose, isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div style={modalOverlayStyle}>
            <div ref={modalRef} style={modalContentStyle}>
                {children}
            </div>
        </div>,
        document.body
    );
};