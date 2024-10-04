import React from "react";
import{Board} from './Board'
import {render, screen} from "@testing-library/react";
import {BoardProvider} from "../../Context/BoardContext/BoardContext";
import {BoardState} from "../../Context/BoardContext/Types";
import {DragDropProvider} from "../../Context/DragDropContext/DragDropContext";


beforeEach(() => {
    window.localStorage.clear();
});

jest.mock("../Header/Header", () => ({
    Header: () => {
        return <h1>Mock Trello Board!</h1>
    }
}))

jest.mock("../AddColumn/AddColumn", () => ({
    AddColumn: () => {
        return <h1>Add Column</h1>;
    }
}));

const contextWrapper = ({children}: {children : React.ReactNode}) => {
    return (
        <BoardProvider>
            <DragDropProvider>
            {children}
            </DragDropProvider>
        </BoardProvider>
    )
}


describe("Board", () => {
    const initialState: BoardState = {
        Board: {
            Columns: [{ id: '1', title: 'Column 1' }, { id: '2', title: 'Column 2' }],
            Cards: [],
        },
    };

    it('should render header', () => {
        render(<Board />, {wrapper: contextWrapper});
        expect(screen.getByRole("heading", { name: "Mock Trello Board!" })).toBeVisible();
    });

    it('should render the correct number of columns', () => {
        window.localStorage.setItem('boardState', JSON.stringify(initialState));

        render(<Board />, {wrapper: contextWrapper});

        const columns = screen.getAllByTestId(/column-/);

        expect(columns.length).toBe(initialState.Board.Columns.length);
    });

    it('should render addColumn', () => {
        window.localStorage.setItem('appState', JSON.stringify(initialState));

        render(<Board />, {wrapper: contextWrapper});

        expect(screen.getByRole("heading", { name: "Add Column" })).toBeVisible();
    });

});