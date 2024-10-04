import { Card as CardProps } from "./Types";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "../../Feature/Modal/Modal";
import { Button } from "../../Feature/Button/Button";
import { EditCard } from "../EditCard/EditCard";

const cardStyle: React.CSSProperties = {
    backgroundColor: "#979b98",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    padding: "16px",
    marginBottom: "16px",
    width: "75%",
    minHeight: "200px",
    maxHeight: "200px",
    transition: "box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    flex: "1",
};

const cardContentStyle: React.CSSProperties = {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "12px",
};

const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "black",
    marginBottom: "16px",
    lineHeight: "1.4",
};

const footerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
};

export const Card: React.FC<CardProps> = (card) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="card" style={cardStyle} data-testid={"card"}>
                <div style={cardContentStyle}>
                    <h3 style={titleStyle}>{card.title}</h3>
                    <p style={descriptionStyle}>{card.description}</p>
                </div>
                <Button buttonText={"Edit"} onClick={openModal} />
                <div style={footerStyle}>
                    <span>{moment().format("L")}</span>
                </div>
            </div>
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <EditCard cardInEdit={card} onClose={closeModal} />
            </Modal>
        </>
    );
};