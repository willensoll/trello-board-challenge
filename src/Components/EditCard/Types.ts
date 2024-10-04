import {Card} from "../Card/Types";

export interface EditCardProps {
    cardInEdit: Card;
    onClose: () => void;
}