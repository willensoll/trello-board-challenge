import React, {useState} from 'react';
import {DoubleTapToEditProps} from "./Types";
import InputField from "../InputField/InputField";

const inputStyle: React.CSSProperties = {
    display: "inline-block",
    width: "140px"

}

export const TextToInput: React.FC<DoubleTapToEditProps> = ({text, onChange}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleTap = () => {
        setIsEditing(true)
    };


    return (
        <div>
            {isEditing || text === "" ? (
                <InputField
                    value={text}
                    onChange={onChange}
                    onBlur={() => {
                        setIsEditing(false);
                    }}
                    autoFocus
                    setIsEditing={setIsEditing}
                />
            ) : (
                <span onClick={handleTap} style={inputStyle}>{text}</span>
            )}
        </div>
    );
};