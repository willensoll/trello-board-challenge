import React from "react";
import{Board} from './Board'
import {render, screen} from "@testing-library/react";
import {BoardProvider} from "../../Context/BoardContext/BoardContext";


beforeEach(() => {
    window.localStorage.clear();
});

jest.mock("../Header/Header", () => ({
    Header: () => {
        return <h1>Mock Trello Board!</h1>
    }
}))



describe("Board", () => {
    it('should render header', () => {
        render(<BoardProvider><Board /></BoardProvider>);
        expect(screen.getByRole("heading", { name: "Mock Trello Board!" })).toBeVisible();
    });

});