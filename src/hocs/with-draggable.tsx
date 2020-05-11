import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import React, {MutableRefObject, useRef, useState} from "react";
import * as styles from "./with-draggable.scss";
import cn from "classnames";

export interface IWithDraggableProps {
    onDragStop?: WithDraggableOnDragStop,
    columnIndex?: number,
    rowIndex?: number,
    id?: string,
    ref?: MutableRefObject<HTMLDivElement>
}

export type WithDraggableOnDragStop = (e: DraggableEvent, data: DraggableData, currentColumnIndex: number, currentRowIndex: number, id: string) => void;

export function withDraggable<T extends object>(WrappedComponent: React.FunctionComponent<T>, handleId: string): React.FunctionComponent<T & IWithDraggableProps> {
    return function({
            onDragStop,
            columnIndex,
            rowIndex,
            id,
            ref, ...props}: T & IWithDraggableProps) {
        const [position, setPosition] = useState({x: 0, y: 0});

        return <Draggable
            handle={`#${handleId}`}
            position={onDragStop && position}
            onStop={(ev: DraggableEvent, data: DraggableData) => {
                if(onDragStop) {
                    onDragStop(ev, data, columnIndex, rowIndex, id);
                    setPosition({x: 0, y: 0});
                }
            }}
            defaultClassName={styles.draggable}
            defaultClassNameDragging={styles.draggableMoving}
        >
            <div ref={ref} className={cn(styles.draggableWrapper)}>
                <div className={styles.draggableLine} id={handleId}/>
                <WrappedComponent {...props as T}/>
            </div>
        </Draggable>;
    };
}



