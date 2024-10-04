import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {Modal} from "./Modal";


describe('Modal', () => {

    it('should render modal when isOpen is true', () => {
        render(<Modal onClose={jest.fn()} isOpen={true} children={<>Title:</>}/>);

        expect(screen.getByText('Title:')).toBeInTheDocument();
    });

    it('should not render modal when isOpen is false', () => {
        const {container} = render(<Modal onClose={jest.fn()} isOpen={false} children={<></>}/>);
        expect(container).toBeEmptyDOMElement();
    });

    it('should call onClose when clicking outside the modal', () => {
        const handleClose = jest.fn();
        render(<Modal onClose={handleClose} isOpen={true} children={<></>}/>);

        fireEvent.mouseDown(document.body);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

})