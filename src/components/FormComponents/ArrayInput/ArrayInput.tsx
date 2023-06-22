import { TextInput } from "components/FormComponents/TextInput/TextInput";
import { useState } from "react";
import { checkArrayExp, getArrayItems } from "./validation";
import { Bool, NumericType } from "common";

type Props = {
    isValid: boolean;
    disabled: boolean;
    itemType: NumericType | Bool;
    onChange: (value: any[]) => void;
};

export const ArrayInput = ({
    itemType,
    isValid,
    disabled,
    onChange,
}: Props) => {
    const [isArrayValid, setIsArrayValid] = useState(false);

    return (
        <TextInput
            isValid={isValid && isArrayValid}
            onChange={(ev) => {
                const arr = getArrayItems(ev.target.value, itemType);

                if (!arr) {
                    setIsArrayValid(false);
                    return;
                }

                setIsArrayValid(false);
                onChange(arr);
            }}
            placeholder={`array<${itemType}>...`}
            disabled={disabled}
        />
    );
};
