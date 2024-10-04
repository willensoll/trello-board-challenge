import {act} from 'react'
import {BoardProvider, useBoardContext} from "./BoardContext";
import {BoardState} from "./Types";
import {render, screen} from "@testing-library/react";


const TestComponent = () => {
    const {state} = useBoardContext();
    return (
        <div>
            <div data-testid={"state"}>{JSON.stringify(state)}</div>
        </div>
    )
}

describe("BoardContext", () => {
    beforeEach(() => {
        window.localStorage.clear()
    })


    test('should initialise state from localStorage', () => {
        const initialState: BoardState = {
            Board: {
                Columns: [{
                    "title": "Column 1",
                    "id": "some-id"
                }], Cards: []
            }
        };
        window.localStorage.setItem('boardState', JSON.stringify(initialState))

        render(
            <BoardProvider>
                <TestComponent/>
            </BoardProvider>
        )

        expect(screen.getByTestId('state').textContent).toBe(JSON.stringify(initialState))
    })

    test('should initialise state with default value if localStorage is empty', () => {
        render (
            <BoardProvider>
                <TestComponent/>
            </BoardProvider>
        )
        const defaultState = {Board: {
                Columns: [{ id: '1', title: 'Column 1' }, { id: '2', title: 'Column 2' }],
                Cards: [{id: "1", columnGroup: "1", title: "A Card"}],
            }};
        expect(screen.getByTestId('state').textContent).toBe(JSON.stringify(defaultState));

    })

    test('should update state and persist to localStorage', () => {
        const TestComponentChangeState = () => {
            const {state, setState} = useBoardContext();
            return (
                <div>
                    <button onClick={() => {
                        setState({
                            ...state, Board: {
                                Columns: [{
                                    "title": "Will",
                                    "id": "562f0d3d-7690-47ac-8a56-3dc262c622bb"
                                }], Cards: []
                            }
                        })
                    }}>
                        Update State
                    </button>
                    <div data-testid="state">{JSON.stringify(state)}</div>
                </div>
            )
        }

        render(
            <BoardProvider>
                <TestComponentChangeState/>
            </BoardProvider>
        );

        act(() => {
            screen.getByText('Update State').click();
        })

        const updatedState = {
            Board: {
                Columns: [{
                    "title": "Will",
                    "id": "562f0d3d-7690-47ac-8a56-3dc262c622bb"
                }], Cards: []
            }
        };
        expect(screen.getByTestId('state').textContent).toBe(JSON.stringify(updatedState));
    })
})