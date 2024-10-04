import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {EditCard} from "./EditCard";
import {Card} from "../Card/Types";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";

jest.mock('../../Context/BoardContext/BoardContext', () => ({
    useBoardContext: jest.fn(),
}));

const mockSetState = jest.fn();

describe('EditCard', () => {
    const cardInEdit: Card = {id: '1', title: 'Test Card', description: 'Test Description', columnGroup: "1"};

    beforeEach(() => {
        (useBoardContext as jest.Mock).mockReturnValue({setState: mockSetState});
    });

    it('should update title and description fields', () => {
        render(<EditCard onClose={jest.fn()} cardInEdit={cardInEdit}/>);

        const titleText = screen.getByText(cardInEdit.title) as HTMLSpanElement
        const descriptionText = screen.getByText('Test Description') as HTMLSpanElement

        fireEvent.click(titleText);

        // Update title
        const titleInput = screen.getByDisplayValue('Test Card') as HTMLInputElement;
        fireEvent.change(titleInput, {target: {value: 'Updated Title'}});
        expect(titleInput.value).toBe('Updated Title');

        fireEvent.click(descriptionText);

        const descriptionInput = screen.getByDisplayValue('Test Description') as HTMLInputElement;
        fireEvent.change(descriptionInput, {target: {value: 'Updated Description'}});
        expect(descriptionInput.value).toBe('Updated Description');
    });


    it('should save changes when Save button is clicked', () => {
        const handleClose = jest.fn();
        const initialState = {
            Board: {
                Cards: [
                    cardInEdit,
                    { id: '2', title: 'Another Card', description: 'Another Description', columnGroup: "1" }
                ]
            }
        };

        render(<EditCard onClose={handleClose} cardInEdit={cardInEdit} />);

        const titleText = screen.getByText(cardInEdit.title) as HTMLSpanElement;
        const descriptionText = screen.getByText('Test Description') as HTMLSpanElement;

        fireEvent.click(titleText);

        const titleInput = screen.getByDisplayValue('Test Card') as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        fireEvent.click(descriptionText);

        const descriptionInput = screen.getByDisplayValue('Test Description') as HTMLInputElement;
        fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

        fireEvent.click(screen.getByText('Save'));

        expect(mockSetState).toHaveBeenCalledTimes(1);

        const stateUpdater = mockSetState.mock.calls[0][0]

        const newState = stateUpdater(initialState)

        expect(newState.Board.Cards).toHaveLength(2);
        expect(newState.Board.Cards).toEqual([{ id: "1", title: "New Title", description: "New Description", columnGroup: '1' },  { id: '2', title: 'Another Card', description: 'Another Description', columnGroup: "1" }]);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
})