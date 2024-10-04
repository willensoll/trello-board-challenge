import { renderHook } from '@testing-library/react';
import { useBoardContext } from '../../Context/BoardContext/BoardContext';
import { useDelete } from './useDelete';
import {BoardState} from "../../Context/BoardContext/Types";
import {act} from "react";


jest.mock('../../context/BoardContext/BoardContext', () => ({
    useBoardContext: jest.fn(),
}));

describe('useDelete', () => {
    let mockSetState: jest.Mock;
    let initialState: BoardState;

    beforeEach(() => {
        mockSetState = jest.fn();
        initialState = {
            Board: {
                Columns: [{ id: '1', title: "col1" }, { id: '2', title: "col1" }],
                Cards: [
                    { id: 'a', columnGroup: '1', title: "title1" },
                    { id: 'b', columnGroup: '2', title: "title2" },
                ],
            },
        };

        (useBoardContext as jest.Mock).mockReturnValue({ setState: mockSetState });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should delete a column and its associated cards', () => {
        const { result } = renderHook(() => useDelete());

        act(() => {
            result.current.deleteColumn('1');
        });

        expect(mockSetState).toHaveBeenCalledTimes(1);

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater(initialState);

        expect(newState.Board.Columns).toHaveLength(1);
        expect(newState.Board.Columns).not.toContainEqual({ id: '1' });
        expect(newState.Board.Cards).toHaveLength(1);
        expect(newState.Board.Cards).not.toContainEqual({ id: 'a', columnGroup: '1' });
    });

    test('should delete a card', () => {
        const { result } = renderHook(() => useDelete());

        act(() => {
            result.current.deleteCard('a');
        });

        expect(mockSetState).toHaveBeenCalledTimes(1);

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater(initialState);

        expect(newState.Board.Cards).toHaveLength(1);
        expect(newState.Board.Cards).not.toContainEqual({ id: 'a', columnGroup: '1' });
    });
});