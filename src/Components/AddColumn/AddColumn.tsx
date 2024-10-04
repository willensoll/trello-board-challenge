import React, {useState} from "react";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {v4 as uuidGen} from "uuid";
import InputField from "../../Feature/InputField/InputField";
import {Button} from "../../Feature/Button/Button";


const newColumnStyle: React.CSSProperties = {
    gridRow: "2",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#6f9582",
    color: "black",
    height: "20vh",
    alignItems: "center",
    borderRadius: "8px",
}

export const AddColumn = () => {
    const [columnTitle, setColumnTitle] = useState("");

    const {setState} = useBoardContext();

    const addColumn = (columnTitle: string) => {
        if (columnTitle) {
            setState((prevState) => {
                const id = uuidGen();
                const newColumn = {title: columnTitle, id: id}
                return {
                    ...prevState,
                    Board: {
                        ...prevState.Board,
                        Columns: [...prevState.Board.Columns, newColumn]
                    }
                };
            });
            setColumnTitle("")
        } else {
            return
        }
    }

    return (
        <div style={newColumnStyle}>
            <h1>New Column</h1>
            <InputField placeholder={"Add column..."} value={columnTitle} onChange={setColumnTitle}
                        save={() => addColumn(columnTitle)}/>
            <Button isDisabled={columnTitle === ""} onClick={() => addColumn(columnTitle)}/>
        </div>
    )
}