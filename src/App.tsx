import React from 'react';
import './App.css';
import {BoardProvider} from "./Context/BoardContext/BoardContext";
import {Board} from "./Components/Board/Board";
import {DragDropProvider} from "./Context/DragDropContext/DragDropContext";

function App() {
    return (
        <BoardProvider>
            <DragDropProvider>
            <Board/>
            </DragDropProvider>
        </BoardProvider>
    );
}

export default App;
