import {Card} from "../Card/Types";

export type Column = {
    id: string
    title: string,
    cards?: Card[]
    onDrop?: (id: string) => void;
}
