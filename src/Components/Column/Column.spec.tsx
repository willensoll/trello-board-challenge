import {Column} from "./Column";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {useDragDrop} from "../../Context/DragDropContext/DragDropContext";
import {useDelete} from "../../Hooks/UseDelete/useDelete";


jest.mock('../../Context/DragDropContext/DragDropContext', () => ({
    useDragDrop: jest.fn(),
    DragDropProvider: jest.fn()

}))

jest.mock('../../Hooks/UseDelete/useDelete', () => ({
    useDelete: jest.fn()
}))

jest.mock("../Card/Card", () => ({
    Card: () => <div>A test card</div>
}))

jest.mock("../AddCard/AddCard", () => ({
    AddCard: () => <h1>Add card mock</h1>
}))

describe("Column", () => {
    const mockEndDrag = jest.fn();
    const mockDeleteColumn = jest.fn();


    const columnProps = {
        title: 'Test Column',
        cards: [{id: '1', title: 'Card 1', columnGroup: 'column-1'},
            {id: '2', title: 'Card 2', columnGroup: 'column-1'}],
        id: 'column-1',
        onDrop: jest.fn()
    };

    beforeEach(() => {
        (useDragDrop as jest.Mock).mockReturnValue({endDrag: mockEndDrag});
        (useDelete as jest.Mock).mockReturnValue({deleteColumn: mockDeleteColumn});


    })

    it("Should render column title", () => {
        render(<Column {...columnProps}/>)

        expect(screen.getByText(columnProps.title)).toBeInTheDocument()
    })

    it('should render correct number of cards', () => {
        render(<Column {...columnProps}/>)

        const cards = screen.queryAllByText('A test card')
        expect(cards).toHaveLength(2);

    })

    it('should not render cards of a different column group', () => {
        const columnProps = {
            title: 'Test Column',
            cards: [{id: '1', title: 'Card 1', columnGroup: 'column-1'},
                {id: '2', title: 'Card 2', columnGroup: 'column-999'}],
            id: 'column-1',
        };

        render(<Column {...columnProps}/>)

        const cards = screen.queryAllByText('A test card')
        expect(cards).toHaveLength(1);
    })

    it('should render newCard', () => {

        render(<Column {...columnProps}/>);

        expect(screen.getByRole("heading", { name: "Add card mock" })).toBeVisible();
    });


    it('should handle drag over event', () => {
        render(<Column {...columnProps} />);

        const columnElement = screen.getByTestId(`column-${columnProps.title}`);

        const dragOverEvent = new Event('dragover', {
            bubbles: true,
            cancelable: true,
        });

        Object.defineProperty(dragOverEvent, 'dataTransfer', {
            value: {
                dropEffect: 'move',
                effectAllowed: 'move',
                files: [],
                items: {},
                types: [],
                setData: jest.fn(),
                getData: jest.fn(),
                clearData: jest.fn(),
            },
            writable: false,
        });

        fireEvent(columnElement, dragOverEvent);

        expect(dragOverEvent.defaultPrevented).toBe(true);
    });

    it('should handle drop event', () => {
        render(<Column {...columnProps} />);

        const columnElement = screen.getByTestId(`column-${columnProps.title}`);

        const dropEvent = new Event('drop', {
            bubbles: true,
            cancelable: true,
        });

        Object.defineProperty(dropEvent, 'dataTransfer', {
            value: {
                getData: jest.fn(() => '1'),
                setData: jest.fn(),
                dropEffect: 'move',
                effectAllowed: 'move',
                files: [],
                items: {},
                types: [],
            },
            writable: false,
        });

        fireEvent(columnElement, dropEvent);

        expect(columnProps.onDrop).toHaveBeenCalledWith('1');

        expect(mockEndDrag).toHaveBeenCalled();
    });

    it('should call deleteColumn when delete button is clicked', () => {
        render(<Column {...columnProps} />);

        const deleteButton = screen.getByRole('button', {name: /delete column/i});

        fireEvent.click(deleteButton);

        expect(mockDeleteColumn).toHaveBeenCalledWith(columnProps.id);
    });
})