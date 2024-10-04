import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { DragDropProvider, useDragDrop } from './DragDropContext';

const TestComponent = () => {
    const { dragging, startDrag, endDrag } = useDragDrop();

    return (
        <div>
            <h1>Dragging: {dragging}</h1>
            <button onClick={() => startDrag('Item 1')}>Start Drag</button>
            <button onClick={endDrag}>End Drag</button>
        </div>
    );
};

describe('DragDropProvider', () => {
    test('provides initial dragging state as null', () => {
        render(
            <DragDropProvider>
                <TestComponent />
            </DragDropProvider>
        );

        expect(screen.getByText('Dragging:')).toBeInTheDocument();
        expect(screen.getByText('Dragging:')).toBeInTheDocument();
    });

    test('updates dragging state when startDrag is called', () => {
        render(
            <DragDropProvider>
                <TestComponent />
            </DragDropProvider>
        );

        const startButton = screen.getByText('Start Drag');
        fireEvent.click(startButton);

        expect(screen.getByText('Dragging: Item 1')).toBeInTheDocument();
    });

    test('resets dragging state when endDrag is called', () => {
        render(
            <DragDropProvider>
                <TestComponent />
            </DragDropProvider>
        );

        const startButton = screen.getByText('Start Drag');
        fireEvent.click(startButton);

        const endButton = screen.getByText('End Drag');
        fireEvent.click(endButton);

        expect(screen.getByText('Dragging:')).toBeInTheDocument();
    });
});