import React, {ReactNode} from "react"
import {Column} from "../../Components/Column/Types";

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


export type Card = {
    id: string,
    columnGroup: string,
    title: string,
    description?: string
}