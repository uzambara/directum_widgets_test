import * as React from "react";
import {ICurrencyRateWidget, IWeatherWidget, IWidget} from "../models";
import {WidgetType} from "../enums";
import {ValidationResult, Validator} from "lakmus";
import {CurrencyRateWidgetValidator, WeatherWidgetValidator} from "../validators";
import {MutableRefObject} from "react";
import _ from "underscore";

function initWidgetsByColumnMap(columnsCount: number) {
    let result = {};
    _.range(columnsCount).map((idx) => result[idx] = []);

    return result;
}

type GetNewRowIndexAfterDragStopParams = {
    currentColumnElementRef: MutableRefObject<HTMLDivElement>,
    currentRowIndex: number,
    currentColumnIndex: number,
    newColumnIdx: number,
    changedWidgetTop: number
}

function getNewRowIndexAfterDragStop({
        currentColumnElementRef,
        currentRowIndex,
        currentColumnIndex,
        newColumnIdx,
        changedWidgetTop}: GetNewRowIndexAfterDragStopParams): number {
    const {current} = currentColumnElementRef;
    let newRowIndex = 0;
    const isTheSameColumn = currentColumnIndex == newColumnIdx;
    for(; newRowIndex < current.children.length; newRowIndex++) {
        if(newRowIndex == currentRowIndex && isTheSameColumn)
            continue;
        const currentWidgetRect = current.children[newRowIndex].getBoundingClientRect();
        if (changedWidgetTop < currentWidgetRect.top) {
            if(newRowIndex - 1 == currentRowIndex && isTheSameColumn) {
                newRowIndex--;
            }
            break;
        }
    }
    return newRowIndex;
}

type GetNewColumnIndexAfterDragStopParams = {
    columnWidth: number,
    columnsCount: number,
    currentColumnIndex: number,
    lastX: number

}

function getNewColumnIndexAfterDragStop({
        columnWidth,
        columnsCount,
        currentColumnIndex,
        lastX}: GetNewColumnIndexAfterDragStopParams): number {
    const halfWidthOfColumn = columnWidth / 2;
    const x = Math.abs(lastX);
    const halfWidthOfColumnCountOffset = Math.floor(x / halfWidthOfColumn);
    let move = 0;

    if(halfWidthOfColumnCountOffset > 0) {
        move = (Math.floor(halfWidthOfColumnCountOffset / 2) + halfWidthOfColumnCountOffset % 2) * Math.sign(lastX);
    }

    let newColumnIdx = currentColumnIndex + move;

    if(newColumnIdx < 0 || newColumnIdx > columnsCount - 1) {
        newColumnIdx = currentColumnIndex;
    }
    return newColumnIdx;
}

function deleteWidget(widget: IWidget, widgetsByColumn: {[columnIdx: number]: IWidget[]}): {[columnIdx: number]: IWidget[]} {
    const {columnIndex, id} = widget;
    const filtered = widgetsByColumn[columnIndex].filter(_widget => _widget.id !== id);
    return {
        ...widgetsByColumn,
        [columnIndex]: filtered
    }
}

function changeWidget(newWidget: IWidget, oldWidget: IWidget, widgetsByColumn: {[columnIdx: number]: IWidget[]}): {[columnIdx: number]: IWidget[]} {
    newWidget.initialData = null;
    if(newWidget.columnIndex === oldWidget.columnIndex) {
        const newWidgets = widgetsByColumn[oldWidget.columnIndex].map(_widget => _widget.id === oldWidget.id ? newWidget : _widget);
        const result = {
            ...widgetsByColumn,
            [oldWidget.columnIndex]: newWidgets
        };
        return result;
    }

    const oldColumnWidgets = widgetsByColumn[oldWidget.columnIndex].filter(_widget => _widget.id !== oldWidget.id);
    const newColumnWidgets = widgetsByColumn[newWidget.columnIndex] || [];
    newColumnWidgets.push(newWidget);
    return {
        ...widgetsByColumn,
        [oldWidget.columnIndex]: oldColumnWidgets,
        [newWidget.columnIndex]: newColumnWidgets
    }
}

function addWidget(widget: IWidget, widgetsByColumn: {[columnIdx: number]: IWidget[]}) {
    let widgetsWithSameColumn = widgetsByColumn[widget.columnIndex];
    if(!widgetsWithSameColumn) {
        widgetsWithSameColumn = [];
    }
    widgetsWithSameColumn.push(widget);
    return {
        ...widgetsByColumn,
        [widget.columnIndex]: widgetsWithSameColumn
    };
}

function changeWidgetPlace(
        id: string,
        columnIndex: number,
        newColumnIndex: number,
        newRowIndex: number,
        widgetsByColumn: {[columnIdx: number]: IWidget[]}) {
    const widgetForChanges = widgetsByColumn[columnIndex].find(w => w.id === id) as IWeatherWidget;
    widgetForChanges.columnIndex = newColumnIndex;
    const currentRowIndex = widgetsByColumn[columnIndex].indexOf(widgetForChanges);

    if(columnIndex == newColumnIndex) {
        if(currentRowIndex == newRowIndex) {
            return widgetsByColumn;
        }

        const filteredArr = widgetsByColumn[newColumnIndex].filter(w => w.id !== id);
        filteredArr.splice(newRowIndex, 0, widgetForChanges);

        return {
            ...widgetsByColumn,
            [newColumnIndex]: filteredArr
        };
    }
    let widgetsCopy = [...widgetsByColumn[newColumnIndex] || []];
    widgetsCopy.splice(newRowIndex, 0, widgetForChanges);
    return {
        ...widgetsByColumn,
        [columnIndex]: widgetsByColumn[columnIndex].filter(w => w.id !== id),
        [newColumnIndex]: widgetsCopy
    };
}

function validateWidget(widget: IWidget): ValidationResult {
    let validator: Validator<IWeatherWidget | ICurrencyRateWidget> = null;
    let result: ValidationResult = null;
    switch(widget.type) {
        case WidgetType.CurrencyRate:
            validator = new CurrencyRateWidgetValidator();
            result = validator.validate(widget as ICurrencyRateWidget);
            break;
        case WidgetType.Weather:
            validator = new WeatherWidgetValidator();
            result = validator.validate(widget as IWeatherWidget);
            break;
    }
    return result;
}

export const widgetUtils = {
    validateWidget,
    getNewColumnIndexAfterDragStop,
    getNewRowIndexAfterDragStop,
    deleteWidget,
    changeWidgetPlace,
    addWidget,
    changeWidget,
    initWidgetsByColumnMap
};