import React, {memo, MutableRefObject, useLayoutEffect, useRef} from "react";
import {IWeatherWidgetProps, WeatherWidget} from "../weather-widget/weather-widget";
import * as styles from "./widgets-table.scss";
import {withDraggable, WithDraggableOnDragStop} from "../../hocs";
import {CurrencyRateWidget, ICurrencyRateWidgetProps} from "../currency-rate-widget/currency-rate-widget";
import {ICurrencyRateWidget, IWeatherWidget, IWidget} from "../../models";
import {WidgetType} from "../../enums";
import _ from "underscore";
import {YandexWeatherService} from "../../services";
import {useComponentSize} from "../../hooks/useComponentSize";
import {widgetUtils} from "../../utils";

export interface IWidgetsTableProps {
    columnsCount: number,
    widgets: {[colIndex: number]: IWidget[]},
    deleteWidget: (widget: IWidget) => void,
    changeWidgetColumn: (id: string, oldColumnIndex: number, newColumnIndex: number, currentRowindex: number, newRowIndex: number) => void
}

const DraggableWeatherWidget = withDraggable<IWeatherWidgetProps>(WeatherWidget, "weatherWidgetHandle");
const DraggableCurrencyRateWidget = withDraggable<ICurrencyRateWidgetProps>(CurrencyRateWidget, "weatherWidgetHandle");

function WidgetsTableComponent(props: IWidgetsTableProps) {
    const {columnsCount, widgets, deleteWidget, changeWidgetColumn} = props;
    const weatherService = new YandexWeatherService();
    const columnRefsArray = useRef<{[key: string]: MutableRefObject<HTMLDivElement>}>({});

    _.range(columnsCount).forEach(i => {
        columnRefsArray.current[i] = useRef<HTMLDivElement>();
    });

    const columnSize = useComponentSize(columnRefsArray.current[0]);
    const onDragStop: WithDraggableOnDragStop =
            (e, data, currentColumnIndex, currentRowIndex, id) => {
        const {lastX, node} = data;
        const newColumnIdx = widgetUtils.getNewColumnIndexAfterDragStop({
            columnWidth: columnSize.width,
            columnsCount,
            currentColumnIndex: currentColumnIndex,
            lastX: lastX});
        const {current} = columnRefsArray.current[newColumnIdx];
        let newRowIndex = 0;
        const changedWidgetTop = node.getBoundingClientRect().top;
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

        changeWidgetColumn(id, currentColumnIndex, newColumnIdx, currentRowIndex, newRowIndex);
    };


    return <section className={styles.widgetsTable}>
        <div className={styles.widgetsTableRow}>
            {
                _.range(columnsCount).map(_columnIndex => {
                    let widgetsByColumn = widgets && widgets[_columnIndex];
                    if(_columnIndex == 2) {
                        console.log("widgetsByColumn", widgetsByColumn);
                    }
                    return <div className={styles.widgetsTableColumn} key={_columnIndex} ref={columnRefsArray.current[_columnIndex]}>
                        {
                            widgetsByColumn?.map((widget, rowIndex) => {

                                if(!widget.id)
                                    debugger;
                                return widget?.type == WidgetType.CurrencyRate
                                ? <DraggableCurrencyRateWidget
                                    widget={widget as ICurrencyRateWidget}
                                    key={widget.id}
                                />
                                : <DraggableWeatherWidget
                                    columnIndex={_columnIndex}
                                    rowIndex={rowIndex}
                                    id={widget.id}
                                    onDragStop={onDragStop}
                                    widget={widget as IWeatherWidget}
                                    key={widget.id}
                                    weatherService={weatherService}
                                    deleteWidget={deleteWidget}
                                />})
                        }
                </div>})
            }
        </div>
    </section>
}

export const WidgetsTable = memo(WidgetsTableComponent);