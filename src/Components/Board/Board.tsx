import {Header} from "../Header/Header";
import {useBoardContext} from "../../Context/BoardContext/BoardContext";
import {Column} from "../Column/Column";

const boardStyle: React.CSSProperties = {
    display: "grid",
    gridAutoColumns: "250px",
    gridAutoFlow: "column",
    gap: "1rem",
    padding: "1rem"

}


export const Board = () => {
    const {state} = useBoardContext();

    return (
        <div style={boardStyle} data-testid="board">
            <>
                <Header/>
                {state.Board.Columns.map((column, i) => {
                    return (<Column key={column.id} cards={state.Board.Cards} title={column.title} id={column.id}
                    />)
                })}
            </>
        </div>
    )
}