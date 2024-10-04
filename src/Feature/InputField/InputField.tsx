import React, {ChangeEvent} from 'react';
import {InputFieldProps} from "./Types";


const InputField: React.FC<InputFieldProps> = ({
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                 save, onBlur, autoFocus
                                               }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (save) {
                save();
            } else if (onBlur) {
                onBlur()
            }
        }
    };

    return (
        <input
            onBlur={onBlur}
            type={"text"}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            autoFocus={autoFocus}
        />
    );
};

export default InputField;