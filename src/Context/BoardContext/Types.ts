import React, {ReactNode} from "react"

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

export type Column = {
    id: string
    title: string,
    cards?: Card[]
}

export type Card = {
    id: string,
    columnGroup: string,
    title: string,
    description?: string
}