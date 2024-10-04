import React, {useState} from 'react';
import {TextToInput} from "../../Feature/TextToInput/TextToInput";
import {Button} from "../../Feature/Button/Button";
import {EditCardProps} from "./Types";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {useDelete} from "../../Hooks/UseDelete/useDelete";


const editCardContainer: React.CSSProperties = {
    display: "flex", flexDirection: "column", height: "100%"
}

const buttonContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
}

const promptContainer: React.CSSProperties = {

    marginTop: "auto",
}

const saveButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "black",
}

const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "#f0f0f0",
    color: "#333",
}


const deleteButtonStyle: React.CSSProperties = {
    backgroundColor: "#cbaa99",
    color: "black",
}


export const EditCard: React.FC<EditCardProps> = ({cardInEdit, onClose}) => {
    const {setState} = useBoardContext()
    const {deleteCard} = useDelete()


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
            <div style={editCardContainer}>
                <TextToInput text={title} onChange={setTitle}/>
                <h2>Description</h2>
                <TextToInput text={description || ""} onChange={setDescription}/>
                <div style={promptContainer}><p><strong>Click the ticket information to edit</strong></p></div>
                <div style={buttonContainer}>
                    <Button onClick={() => saveCard()} buttonText={"Save"} style={saveButtonStyle}/>
                    <Button onClick={onClose} buttonText={"Close"} style={closeButtonStyle}/>
                    <Button onClick={() => deleteCard(cardInEdit.id)} buttonText={"Delete card"}
                            style={deleteButtonStyle}/>
                </div>
            </div>
        </>
    );
};