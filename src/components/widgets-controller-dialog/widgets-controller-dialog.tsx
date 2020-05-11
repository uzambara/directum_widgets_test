import Dialog from "@material-ui/core/Dialog";
import React, {memo} from "react";
import {WidgetsController} from "../index";
import {IWidgetsControllerProps} from "../widgets-controller/widgets-controller";
import * as styles from "./widgets-controller-dialog.scss";

export interface IWidgetsControllerDialogProps extends IWidgetsControllerProps {
    isOpen: boolean,
    close?: () => void
}

function WidgetsControllerDialogComponent(props: IWidgetsControllerDialogProps) {
    const {isOpen, ...other} = props;
    if(!isOpen)
        return null;

    return <Dialog open={true}>
        <section className={styles.widgetsControllerDialog}>
            <WidgetsController {...other}/>
        </section>
    </Dialog>
}

export const WidgetsControllerDialog = memo(WidgetsControllerDialogComponent);