import {Column} from "./Column";
import {render, screen} from "@testing-library/react";

describe("Column", () => {
    const columnProps = {
        title: 'Test Column',
        cards: [ ],
        id: 'column-1',
    };


    it("Should render column title", () => {
        render(<Column {...columnProps}/>)

        expect(screen.getByText(columnProps.title)).toBeInTheDocument()
    })
})