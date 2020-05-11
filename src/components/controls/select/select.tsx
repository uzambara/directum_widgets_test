import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import React, {ChangeEvent, memo, PropsWithChildren, useState} from "react";
import {default as MaterialSelect} from "@material-ui/core/Select";
import {guid} from "../../../utils";

export interface ISelectProps {
    value: string | number,
    onChange: (ev: ChangeEvent<{value: unknown}>) => void,
    labelText?: string,
    className?: string
}

export function Select(props: PropsWithChildren<ISelectProps>) {
    const [_id] = useState(guid());
    const {value, onChange, labelText, className, children} = props;

    return <FormControl className={className} size='small'>
        {labelText && <InputLabel id={_id}>{labelText}</InputLabel>}
        <MaterialSelect labelId={_id} value={value == null ? "" : value}
                        onChange={(ev) => onChange(ev)}>
            {children}
        </MaterialSelect>
    </FormControl>
}
