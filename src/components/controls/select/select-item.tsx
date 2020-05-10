import {default as MaterialMenuItem} from "@material-ui/core/MenuItem";
import React, {PropsWithChildren} from "react";

export interface ISelectItemProps {
    value: string | number
}

export const SelectItem = React.forwardRef<any, PropsWithChildren<ISelectItemProps>>((props: PropsWithChildren<ISelectItemProps>, ref) => {
    const {value, children} = props;
    return <MaterialMenuItem value={value} ref={ref as any} {...props}>{children}</MaterialMenuItem>
});