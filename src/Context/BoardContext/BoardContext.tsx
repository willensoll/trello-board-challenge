import React, {createContext, useState, useEffect, useContext} from 'react';
import {BoardState, BoardContextType, BoardContextProps} from "./Types";

const BoardContext = createContext<BoardContextType | undefined>(undefined);



export const BoardProvider = ({children}: BoardContextProps) => {
    const [state, setState] = useState<BoardState>(() => {
        const storedState = localStorage.getItem('boardState');
        return storedState ? JSON.parse(storedState) : {
            Board: {
                Columns: [],
                Cards: [],
            }
        };
    });

    useEffect(() => {
        localStorage.setItem('boardState', JSON.stringify(state));
    }, [state]);

    return (
        <BoardContext.Provider value={{state, setState}}>
            {children}
        </BoardContext.Provider>
    );
}

export function useBoardContext(): BoardContextType {
    const context = useContext(BoardContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}