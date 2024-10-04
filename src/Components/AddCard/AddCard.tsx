import React, {useState} from "react";
import "../Column/Column.css";
import InputField from "../../Feature/InputField/InputField";
import {Button} from "../../Feature/Button/Button";
import {v4 as uuidGen} from "uuid";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {AddCardProps} from "./Types";

const newCardStyle: React.CSSProperties = {
    gridRow: "2",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#6f9582",
    color: "black",
    width: "75%",
    borderRadius: "8px",
    padding: "16px",
    alignItems: "center",
}

export const AddCard: React.FC<AddCardProps> = ({columnId}) => {
    const [cardTitle, setCardTitle] = useState("")
    const {setState} = useBoardContext();


    const addCard = (cardTitle: string) => {
        if (cardTitle) {
            setState((prevState) => {
                const id = uuidGen();
                const newCard = {title: cardTitle, id: id, columnGroup: columnId}
                return {
                    ...prevState,
                    Board: {
                        ...prevState.Board,
                        Cards: [...prevState.Board.Cards, newCard]
                    }
                };
            });
            setCardTitle("")
        }
    }

    return (
        <div style={newCardStyle} className={"new-card"}
        >
            <h3>Add Card</h3>
            <InputField placeholder={"Enter card title..."} value={cardTitle} onChange={setCardTitle} save={() =>addCard(cardTitle)}/>
            <Button isDisabled={cardTitle === ""} onClick={() =>addCard(cardTitle)} />
        </div>
    )
}