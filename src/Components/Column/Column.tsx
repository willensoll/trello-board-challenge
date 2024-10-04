import {Column as ColumnProps} from "./Types"
import {Card} from "../Card/Card";
import {AddCard} from "../AddCard/AddCard";

const columnStyle: React.CSSProperties = {
    gridRow: "2",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#c8b389",
    color: "black",
    minHeight: "80vh",
    alignItems: "center",
    borderRadius: "8px",
    justifyContent: "space-between"
}

const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "100%",
    overflowY: "auto",
}



export const Column: React.FC<ColumnProps> = ({title, cards, id}) => {
    return (
        <div
            style={columnStyle}
            data-testid={`column-${title}`}
            className={"column"}
        >
            <div style={contentStyle}>
                <h1>{title}</h1>
                {cards && cards.map((card) => {
                    return id === card.columnGroup && (<Card key={card.id} {...card}/>)
                })}
            <AddCard columnId={id} />
            </div>
        </div>
    )
}