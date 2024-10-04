import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BoardProvider} from "./Context/BoardContext/BoardContext";
import {Board} from "./Components/Board/Board";

function App() {
    return (
        <BoardProvider>
            <Board/>
        </BoardProvider>
    );
}

export default App;
