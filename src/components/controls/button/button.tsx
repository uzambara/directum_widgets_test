import React, {memo} from "react";
import {Button as MaterialButton} from '@material-ui/core';

export interface IButtonProps {
    text: string,
    onClick: () => void,
    className?: string
}

function ButtonComponent(props: IButtonProps) {
    const {text, onClick, className} = props;
    return <MaterialButton
        color="primary"
        variant="contained"
        onClick={onClick}
        className={className}>
        {text}
    </MaterialButton>
}

export const Button = memo(ButtonComponent);