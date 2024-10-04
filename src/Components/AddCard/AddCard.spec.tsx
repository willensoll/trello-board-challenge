import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddCard } from "./AddCard";
import { useBoardContext } from "../../Context/BoardContext/BoardContext"; // Adjust the import path as needed


jest.mock("../../Context/BoardContext/BoardContext", () => ({
    useBoardContext: jest.fn(),
}));




jest.mock("uuid", () => ({
    v4: () => "1234-5678-9101",
}));

describe("AddCard Component", () => {
    const mockSetState = jest.fn();

    beforeEach(() => {
        (useBoardContext as jest.Mock).mockReturnValue({ setState: mockSetState });
        jest.clearAllMocks();
    });

    test("renders correctly", () => {
        render(<AddCard columnId="test-column-id" />);
        expect(screen.getByText("Add Card")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter card title...")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("disables button when input is empty", () => {
        render(<AddCard columnId="test-column-id" />);

        const input = screen.getByPlaceholderText("Enter card title...");

        expect(input).toHaveValue("");
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("enables button when input is filled", () => {
        render(<AddCard columnId="test-column-id" />);

        const input = screen.getByPlaceholderText("Enter card title...");
        fireEvent.change(input, { target: { value: "New Card Title" } });

        expect(input).toHaveValue("New Card Title");
        expect(screen.getByRole("button")).toBeEnabled();
    });

    test("calls setState with new card when button is clicked", () => {
        render(<AddCard columnId="test-column-id" />);

        const input = screen.getByPlaceholderText("Enter card title...");
        fireEvent.change(input, { target: { value: "New Card Title" } });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater({
            Board: {
                Cards: []
            }
        });

        expect(newState).toEqual({
            Board: {
                Cards: [{ title: "New Card Title", id: "1234-5678-9101", columnGroup: "test-column-id" }]
            }
        });
    });

    test("calls setState with new card when enter is pushed", () => {
        render(<AddCard columnId="test-column-id" />);

        const input = screen.getByPlaceholderText("Enter card title...");
        fireEvent.change(input, { target: { value: "New Card Title" } });

        fireEvent.keyDown(input, {key: 'Enter'});


        expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));

        const stateUpdater = mockSetState.mock.calls[0][0];
        const newState = stateUpdater({
            Board: {
                Cards: []
            }
        });

        expect(newState).toEqual({
            Board: {
                Cards: [{ title: "New Card Title", id: "1234-5678-9101", columnGroup: "test-column-id" }]
            }
        });
    });

    test("does not call setState when input is empty", () => {
        render(<AddCard columnId="test-column-id" />);

        const input = screen.getByPlaceholderText("Enter card title...");

        const button = screen.getByRole("button");
        fireEvent.click(button);


        fireEvent.keyDown(input, {key: 'Enter'});


        expect(mockSetState).not.toHaveBeenCalled();
    });
});