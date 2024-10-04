import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {Card} from "../../Components/Card/Types";


export const useMoveCard = (): (activeCardId: string, targetColumn: string) => void => {
    const {  setState } = useBoardContext();

    return (activeCardId: string, targetColumn: string): void => {
        setState((prevState) => {
            const updatedCards = prevState.Board.Cards.map((card: Card) =>
                card.id === activeCardId ? {...card, columnGroup: targetColumn} : card
            );

            return {
                ...prevState,
                Board: {
                    ...prevState.Board,
                    Cards: updatedCards
                }
            };
        });
    };
};