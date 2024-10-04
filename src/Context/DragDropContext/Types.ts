import {ReactNode} from "react";

export interface DragDropContextType {
    dragging: string | null;
    startDrag: (item: string) => void;
    endDrag: () => void;
}

export interface DragDropProviderProps {
    children: ReactNode;
}