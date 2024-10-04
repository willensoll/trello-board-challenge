import React, { createContext, useState, useContext  } from 'react';
import {DragDropContextType, DragDropProviderProps} from "./Types";



const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export const DragDropProvider = ({ children }: DragDropProviderProps) => {
    const [dragging, setDragging] = useState<string | null>(null);

    const startDrag = (item: string) => {
        setDragging(item)
    };
    const endDrag = () => setDragging(null);

    return (
        <DragDropContext.Provider value={{ dragging, startDrag, endDrag }}>
            {children}
        </DragDropContext.Provider>
    );
}

export const useDragDrop = (): DragDropContextType => {
    const context = useContext(DragDropContext);
    if (context === undefined) {
        throw new Error('useDragDrop must be used within a DragDropProvider');
    }
    return context;
};