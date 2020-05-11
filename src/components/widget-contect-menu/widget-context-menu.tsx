import React, {memo, useState} from "react";
import {Menu, MenuItem} from "@material-ui/core";
import {guid} from "../../utils";
import * as styles from "./widget-context-menu.scss";

export interface IWidgetContextMenuProps {
    anchorEl: any,
    onClose: () => void,
    onDeleteClick: () => void,
    onEditClick: () => void
}

function WidgetContextMenuComponent(props: IWidgetContextMenuProps) {
    const {anchorEl, onClose, onDeleteClick, onEditClick} = props;
    const [id] = useState(guid());
    return <Menu
        className={styles.widgetContextMenu}
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
    >
        <MenuItem onClick={() => {onClose(); onDeleteClick();}}>Delete</MenuItem>
        <MenuItem onClick={() => {onClose(); onEditClick();}}>Edit</MenuItem>
    </Menu>
}

export const WidgetContextMenu = memo(WidgetContextMenuComponent);