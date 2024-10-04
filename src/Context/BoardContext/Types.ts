import React, {ReactNode} from "react"
import {Column} from "../../Components/Column/Types";
import {Card} from "../../Components/Card/Types";

export interface BoardContextProps {
    children: ReactNode;
}

export interface BoardState {
    Board: {
        Columns: Column[],
        Cards: Card[]
    }
}

export interface BoardContextType {
    state: BoardState,
    setState: React.Dispatch<React.SetStateAction<BoardState>>;
}

