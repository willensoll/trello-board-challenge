import {fireEvent, render, screen} from "@testing-library/react";
import {Card} from "./Card";
import {useDragDrop} from "../../Context/DragDropContext/DragDropContext";


jest.mock('../../context/DragDropContext/DragDropContext', () => ({
    useDragDrop: jest.fn(),
    DragDropProvider: jest.fn()
}));

const mockStartDrag = jest.fn();



describe('Card', () => {
    const cardProps = {
        id: '1',
        title: 'Test Card Title',
        description: 'This is a test card description.',
        columnGroup: "1"
    };


    beforeEach(() => {
        (useDragDrop as jest.Mock).mockReturnValue({startDrag: mockStartDrag});
    });

    it('should render card title and description', () => {
        render(<Card {...cardProps}/>)


        expect(screen.getByText(cardProps.title)).toBeInTheDocument();
        expect(screen.getByText(cardProps.description)).toBeInTheDocument();
    })


    it('should call startDrag on drag start', () => {
        render(<Card {...cardProps} />);

        const cardElement = screen.getByTestId('card');

        const dataTransfer = {
            setData: jest.fn(),
        };

        fireEvent.dragStart(cardElement, { dataTransfer });

        expect(mockStartDrag).toHaveBeenCalledWith(cardProps.id);
        expect(cardElement).toHaveAttribute('draggable');
    });
})