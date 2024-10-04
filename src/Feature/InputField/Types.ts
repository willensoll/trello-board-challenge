import {Dispatch, SetStateAction} from "react";

export interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    save?: () => void;
    onBlur?: () => void;
    autoFocus?: boolean;
    setIsEditing?: Dispatch<SetStateAction<boolean>>
}
