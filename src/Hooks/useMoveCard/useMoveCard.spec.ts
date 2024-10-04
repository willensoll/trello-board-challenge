import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {renderHook} from "@testing-library/react";
import {useMoveCard} from "./useMoveCard";
import {act} from "react";

jest.mock('../../context/BoardContext/BoardContext', () => ({
    useBoardContext: jest.fn(),
}));

describe('useMoveCard', () => {
    const mockSetState = jest.fn();
    const mockState = {
        Board: {
            Cards: [
                { id: '1', columnGroup: 'A' },
                { id: '2', columnGroup: 'B' },
            ],
        },
    };

    beforeEach(() => {
        (useBoardContext as jest.Mock).mockReturnValue({
            state: mockState,
            setState: mockSetState,
        });
    });

    it('should move a card to the target column', () => {
        const { result } = renderHook(() => useMoveCard());

        act(() => {
            result.current('1', 'C');
        });

        expect(mockSetState).toHaveBeenCalledTimes(1);
        const setStateCallback = mockSetState.mock.calls[0][0];
        const newState = setStateCallback(mockState);

        expect(newState.Board.Cards).toEqual([
            { id: '1', columnGroup: 'C' },
            { id: '2', columnGroup: 'B' },
        ]);
    });

    it('should not modify other cards', () => {
        const { result } = renderHook(() => useMoveCard());

        act(() => {
            result.current('2', 'D');
        });

        expect(mockSetState).toHaveBeenCalledTimes(1);
        const setStateCallback = mockSetState.mock.calls[0][0];
        const newState = setStateCallback(mockState);

        expect(newState.Board.Cards).toEqual([
            { id: '1', columnGroup: 'A' },
            { id: '2', columnGroup: 'D' },
        ]);
    });

    it('should not modify state if card id is not found', () => {
        const { result } = renderHook(() => useMoveCard());

        act(() => {
            result.current('3', 'E');
        });

        expect(mockSetState).toHaveBeenCalledTimes(1);
        const setStateCallback = mockSetState.mock.calls[0][0];
        const newState = setStateCallback(mockState);

        expect(newState).toEqual(mockState);
    });
});