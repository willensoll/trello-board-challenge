import {Header} from "../Header/Header";

const boardStyle: React.CSSProperties = {
    display: "grid",
    gridAutoColumns: "250px",
    gridAutoFlow: "column",
    gap: "1rem",
    padding: "1rem"

}


export const Board = () => {
    return (
        <div style={boardStyle} data-testid="board">
            <>
                <Header/>
            </>
        </div>
    )
}