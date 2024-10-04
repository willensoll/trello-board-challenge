import {Header} from "../Header/Header";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {Column} from "../Column/Column";
import {AddColumn} from "../AddColumn/AddColumn";
import {useMoveCard} from "../../Hooks/UseMoveCard/useMoveCard";

const boardStyle: React.CSSProperties = {
    display: "grid",
    gridAutoColumns: "250px",
    gridAutoFlow: "column",
    gap: "1rem",
    padding: "1rem"

}




export const Board = () => {
    const {state} = useBoardContext();
    const moveCard = useMoveCard()


    return (
        <div style={boardStyle} data-testid="board">
            <>
                <Header/>
                {state.Board.Columns.map((column, i) => {
                    return (<Column key={column.id} cards={state.Board.Cards} title={column.title} id={column.id}
                                    onDrop={(activeCardId) => moveCard(activeCardId, column.id)}
                    />)
                })}
                <AddColumn/>
            </>
        </div>
    )
}