import { useBoardContext } from '../../Context/BoardContext/BoardContext';
import { Column } from '../../Components/Column/Types';
import {Card} from '../../Components/Card/Types'
import {ItemType} from "./Types";


export const useDelete = () => {
    const {  setState } = useBoardContext();

    const deleteItem = (itemType: ItemType, itemId: string): void => {
        setState((prevState) => {
            const newState = { ...prevState };

            if (itemType === 'Column') {
                newState.Board.Columns = prevState.Board.Columns.filter(
                    (column: Column) => column.id !== itemId
                );
                newState.Board.Cards = prevState.Board.Cards.filter(
                    (card: Card) => card.columnGroup !== itemId
                );
            } else if (itemType === 'Card') {
                newState.Board.Cards = prevState.Board.Cards.filter(
                    (card: Card) => card.id !== itemId
                );
            }

            return newState;
        });
    };

    const deleteColumn = (columnId: string): void => deleteItem('Column', columnId);
    const deleteCard = (cardId: string): void => deleteItem('Card', cardId);

    return { deleteColumn, deleteCard };
}