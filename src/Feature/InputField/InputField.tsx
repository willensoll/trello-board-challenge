import React, {ChangeEvent} from 'react';
import {InputFieldProps} from "./Types";


const InputField: React.FC<InputFieldProps> = ({
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                 save,
                                               }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (save) {
                save();
            }
        }
    };

    return (
        <input
            type={"text"}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
        />
    );
};

export default InputField;