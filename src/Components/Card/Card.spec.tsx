import {render, screen} from "@testing-library/react";
import {Card} from "./Card";

describe('Card', () => {
    const cardProps = {
        id: '1',
        title: 'Test Card Title',
        description: 'This is a test card description.',
        columnGroup: "1"
    };

    it('should render card title and description', () => {
        render(<Card {...cardProps}/>)


        expect(screen.getByText(cardProps.title)).toBeInTheDocument();
        expect(screen.getByText(cardProps.description)).toBeInTheDocument();
    })
})