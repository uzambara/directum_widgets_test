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

        let newRowIndex = widgetUtils.getNewRowIndexAfterDragStop({
            changedWidgetTop: node.getBoundingClientRect().top,
            currentColumnIndex: currentColumnIndex,
            newColumnIdx: newColumnIdx,
            currentColumnElementRef: columnRefsArray.current[newColumnIdx],
            currentRowIndex: currentRowIndex
        });

        changeWidgetColumn(id, currentColumnIndex, newColumnIdx, currentRowIndex, newRowIndex);
    };


    return <section className={styles.widgetsTable}>
        <div className={styles.widgetsTableRow}>
            {
                _.range(columnsCount).map(_columnIndex => {
                    let widgetsByColumn = widgets && widgets[_columnIndex];
                    return <div className={styles.widgetsTableColumn} key={_columnIndex} ref={columnRefsArray.current[_columnIndex]}>
                        {
                            widgetsByColumn?.map((widget, rowIndex) => widget?.type == WidgetType.CurrencyRate
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
                                />)
                        }
                </div>})
            }
        </div>
    </section>
}

export const WidgetsTable = memo(WidgetsTableComponent);