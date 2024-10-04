import {Column as ColumnProps} from "./Types"
import {Card} from "../Card/Card";
import {AddCard} from "../AddCard/AddCard";
import {useDragDrop} from "../../Context/DragDropContext/DragDropContext";
import {useDelete} from "../../Hooks/UseDelete/useDelete";
import {Button} from "../../Feature/Button/Button";

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

const deleteButtonStyle: React.CSSProperties = {
    backgroundColor: "#cbaa99",
    color: "black",
    width: "60%",
    marginTop: "auto",
    marginBottom: "10px"
}



export const Column: React.FC<ColumnProps> = ({title, cards, id, onDrop}) => {
    const {endDrag} = useDragDrop();
    const { deleteColumn } = useDelete();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const droppedItemId = e.dataTransfer.getData('text/plain');
        if (onDrop) {
            onDrop(droppedItemId);
        }
        endDrag();
    };

    return (
        <div
            style={columnStyle}
            data-testid={`column-${title}`}
            className={"column"}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div style={contentStyle}>
                <h1>{title}</h1>
                {cards && cards.map((card) => {
                    return id === card.columnGroup && (<Card key={card.id} {...card}/>)
                })}
            <AddCard columnId={id} />
            </div>
            <Button
                style={deleteButtonStyle}
                isDisabled={false}
                onClick={() => deleteColumn(id)}
                buttonText={"Delete Column"}
            />
        </div>
    )
}