import {ChangeEvent, useState} from "react";

export function useSelectInput<T>(defaultValue?: T) {
    const [value, setValue] = useState<T>(defaultValue);
    const onChange = (ev: ChangeEvent<{value: any}>) => {
        setValue(ev.target.value);
    };

    return {
        value,
        setValue,
        onChange
    };
}