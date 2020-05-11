import {useCallback, useState} from "react";

export function useTigerValue<T>(offValue: T) {
    const [value, setValue] = useState<T>();
    const setOn = (val) => setValue(val);
    const setOff = () => setValue(offValue);
    return {
        setOn,
        setOff,
        value
    }
}