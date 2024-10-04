
export interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    save?: () => void;
}
