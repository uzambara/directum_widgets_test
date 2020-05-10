import * as React from "react";
import {ICurrencyRateWidget, IWeatherWidget, IWidget} from "../models";
import {WidgetType} from "../enums";
import {ValidationResult, Validator} from "lakmus";
import {CurrencyRateWidgetValidator, WeatherWidgetValidator} from "../validators";
import {MutableRefObject} from "react";

function createCurrencyRateWidget({
        currency1,
        currency2,
        columnIndex}: Partial<ICurrencyRateWidget>): ICurrencyRateWidget {
    return {
        id: "",
        columnIndex,
        currency1,
        currency2,
        type: WidgetType.CurrencyRate
    }
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

function getDefaultCurrencyRateWidget(): ICurrencyRateWidget {
    return {
        id: "",
        columnIndex: 0,
        currency1: undefined,
        currency2: undefined,
        type: undefined
    }
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
    createCurrencyRateWidget,
    validateWidget,
    getDefaultCurrencyRateWidget,
    getNewColumnIndexAfterDragStop,
    getNewRowIndexAfterDragStop
};