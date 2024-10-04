import React from "react"
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {AddColumn} from "./AddColumn";
import {fireEvent, render, screen} from "@testing-library/react";

jest.mock("../../context/BoardContext/BoardContext", () => ({
    useBoardContext: jest.fn(),
}));

jest.mock("uuid", () => ({
    v4: () => "1234-5678-9101",
}));


describe("AddColumn", () => {
    const mockSetState = jest.fn();


    beforeEach(() => {
        (useBoardContext as jest.Mock).mockReturnValue({ setState: mockSetState });
        jest.clearAllMocks();
    })

    test("AddColumn renders correctly", () => {
        render(<AddColumn />);
        expect(screen.getByText("New Column")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Add column...")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("button disabled when input has no value", () => {
        render(<AddColumn />);

        const input = screen.getByPlaceholderText("Add column...");

        expect(input).toHaveValue("");
        expect(screen.getByRole("button")).toBeDisabled();
    })

    test("button is enabled when input has value", () => {
        render(<AddColumn />);

        const input = screen.getByPlaceholderText("Add column...");
        fireEvent.change(input, { target: { value: "New Column Title" } });

        expect(input).toHaveValue("New Column Title");
        expect(screen.getByRole("button")).toBeEnabled();
    });

    test("calls setState with new column when button is clicked", () => {
        render(<AddColumn />);

        const input = screen.getByPlaceholderText("Add column...");
        fireEvent.change(input, { target: { value: "New Column Title" } });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater({
            Board: {
                Columns: []
            }
        });

        expect(newState).toEqual({
            Board: {
                Columns: [{ title: "New Column Title", id: "1234-5678-9101" }]
            }
        });
    });

    test("calls setState with new column when enter button is pressed", () => {
        render(<AddColumn />);

        const input = screen.getByPlaceholderText("Add column...");
        fireEvent.change(input, { target: { value: "New Column Title" } });

        fireEvent.keyDown(input, {key: 'Enter'});

        expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater({
            Board: {
                Columns: []
            }
        });

        expect(newState).toEqual({
            Board: {
                Columns: [{ title: "New Column Title", id: "1234-5678-9101" }]
            }
        });
    });

    test("does not call setState when input is empty", () => {
        render(<AddColumn />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        const input = screen.getByPlaceholderText("Add column...");

        fireEvent.keyDown(input, {key: 'Enter'});

        expect(mockSetState).not.toHaveBeenCalled();
    });


})