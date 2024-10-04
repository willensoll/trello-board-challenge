import {Column} from "./Column";
import {render, screen} from "@testing-library/react";
import React from "react";


jest.mock("../Card/Card", () => ({
    Card: () => <div>A test card</div>
}))

jest.mock("../AddCard/AddCard", () => ({
    AddCard: () => <h1>Add card mock</h1>
}))


describe("Column", () => {
    const columnProps = {
        title: 'Test Column',
        cards: [{id: '1', title: 'Card 1', columnGroup: 'column-1'},
            {id: '2', title: 'Card 2', columnGroup: 'column-1'}],
        id: 'column-1',
    };


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
})