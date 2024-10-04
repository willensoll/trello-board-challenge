import React, {createContext, useState, useEffect, useContext} from 'react';
import {BoardState, BoardContextType, BoardContextProps} from "./Types";

const BoardContext = createContext<BoardContextType | undefined>(undefined);



export const BoardProvider = ({children}: BoardContextProps) => {
    const [state, setState] = useState<BoardState>(() => {
        const storedState = localStorage.getItem('boardState');
        return storedState ? JSON.parse(storedState) : {
            Board: {
                Columns: [{ id: '1', title: 'Column 1' }, { id: '2', title: 'Column 2' }],
                Cards: [{id: "1", columnGroup: "1", title: "A Card", description: "A description"}],
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