import React, {useState} from 'react';
import {TextToInput} from "../../Feature/TextToInput/TextToInput";
import {Button} from "../../Feature/Button/Button";
import {EditCardProps} from "./Types";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";

const buttonContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "20px",
}

const saveButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "black",
}

const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "#f0f0f0",
    color: "#333",
}


export const EditCard: React.FC<EditCardProps> = ({cardInEdit, onClose}) => {
    const {setState} = useBoardContext()

    const [title, setTitle] = useState(cardInEdit.title);
    const [description, setDescription] = useState(cardInEdit.description);

    const saveCard = () => {
        if (title) {
            setState((prevState) => {
                const updatedCards = prevState.Board.Cards.map(card =>
                    card.id === cardInEdit.id ? {...card, title, description} : card
                );
                return {...prevState, Board: {...prevState.Board, Cards: updatedCards}};
            });
            onClose();
        }
    };

    return (
        <>
            <h1>Title:</h1>
            <div>
                <TextToInput text={title} onChange={setTitle}/>
                <h2>Description</h2>
                <TextToInput text={description || ""} onChange={setDescription}/>
                <p>Click the text to edit</p>
                <div style={buttonContainer}>
                    <Button onClick={() => saveCard()} buttonText={"Save"} style={saveButtonStyle}/>
                    <Button onClick={onClose} buttonText={"Close"} style={closeButtonStyle}/>
                </div>
            </div>
        </>
    );
};