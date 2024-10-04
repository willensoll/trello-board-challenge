import {Column as ColumnProps} from "./Types"

export const Column: React.FC<ColumnProps> = ({title, cards, id}) => {
    return (
        <div
            data-testid={`column-${title}`}
            className={"column"}
        >
            <div>
                <h1>{title}</h1>
            </div>

        </div>
    )
}