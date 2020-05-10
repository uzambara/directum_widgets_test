import React, {useCallback, useEffect, useState} from "react";
import * as styles from './main.page.scss';
import {WidgetsController, WidgetsTable} from "../components";
import {ICity, IWeatherWidget, IWidget} from "../models";
import {CitiesService, YandexWeatherService} from "../services";
import {TemperatureUnitType, WidgetType} from "../enums";
import {guid} from "../utils";

export interface IMainPageProps {
    columnsCount: number
}
const initialWidgets: {[colIndex: number]: IWeatherWidget[]} = {
    0: [
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 1, displayName:"Абакан", lat: "53.720976", lon: "91.44242300000001"},
            columnIndex: 0,
            temperatureUnit: TemperatureUnitType.Fahrenheit
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 2, displayName:"Архангельск", lat: "64.539304", lon: "40.518735"},
            columnIndex: 0,
            temperatureUnit: TemperatureUnitType.Celsius
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 3, displayName:"Астана", lat: "71.430564", lon: "51.128422"},
            columnIndex: 0,
            temperatureUnit: TemperatureUnitType.Celsius
        },
    ],
    1: [
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 4, displayName:"Астрахань", lat: "46.347869", lon: "48.033574"},
            columnIndex: 1,
            temperatureUnit: TemperatureUnitType.Fahrenheit
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 80, displayName:"Ульяновск", lat: "54.317002", lon: "48.402243"},
            columnIndex: 1,
            temperatureUnit: TemperatureUnitType.Celsius
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 87, displayName:"Энгельс", lat: "51.498891", lon: "46.125121"},
            columnIndex: 1,
            temperatureUnit: TemperatureUnitType.Fahrenheit
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 12, displayName:"Великий Новгород", lat: "58.521475", lon: "31.275475"},
            columnIndex: 1,
            temperatureUnit: TemperatureUnitType.Celsius
        },
    ],
    2: [
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 72, displayName:"Тамбов", lat: "52.721246", lon: "41.452238"},
            columnIndex: 2,
            temperatureUnit: TemperatureUnitType.Celsius
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 56, displayName:"Пермь", lat: "58.004785", lon: "56.237654"},
            columnIndex: 2,
            temperatureUnit: TemperatureUnitType.Celsius
        },
        {
            id: guid(),
            type: WidgetType.Weather,
            city: {id: 23, displayName:"Ижевск", lat: "56.852775", lon: "53.211463"},
            columnIndex: 2,
            temperatureUnit: TemperatureUnitType.Celsius
        },
    ]
};

const weatherService = new YandexWeatherService();
export function MainPage(props: IMainPageProps) {
    const {columnsCount} = props;
    const [cities, setCities] = useState<ICity[]>([]);
    const [widgets, setWidgets] = useState<{[colIndex: number]: IWidget[]}>(initialWidgets);
    const deleteWidget = useCallback((widget: IWidget) => {
        const {id, columnIndex} = widget;
        const filteredWidgets = widgets[columnIndex].filter(widget => widget.id !== id);

        setWidgets({
            ...widgets,
            [columnIndex]: filteredWidgets
        })
    }, [widgets]);
    const changeWidgetColumn = (id: string, oldColumnIndex: number, newColumnIndex: number, currentRowIndex: number, newRowIndex: number) => {
        const widgetForChanges = widgets[oldColumnIndex].find(w => w.id === id) as IWeatherWidget;

        if(oldColumnIndex == newColumnIndex) {
            if(currentRowIndex == newRowIndex) {
                return;
            }

            const filteredArr = widgets[newColumnIndex].filter(w => w.id !== id);
            filteredArr.splice(newRowIndex, 0, widgetForChanges);
            console.log("filteredArr", filteredArr);
            setWidgets({
                ...widgets,
                [newColumnIndex]: filteredArr
            });
            return;
        }
        let widgetsCopy = [...widgets[newColumnIndex]];
        widgetsCopy.splice(newRowIndex, 0, widgetForChanges);
        setWidgets({
            ...widgets,
            [oldColumnIndex]: widgets[oldColumnIndex].filter(w => w.id !== id),
            [newColumnIndex]: widgetsCopy
        });
    };

    useEffect(() => {
        CitiesService
            .getCities()
            .then(setCities);
    }, []);
    const onWidgetAdd = (widget: IWidget) => {
        let widgetsByColumn = widgets[widget.columnIndex];
        if(!widgetsByColumn) {
            widgetsByColumn = [];
        }
        widgetsByColumn.push(widget);
        setWidgets(prevWidgets => ({
            ...prevWidgets,
            [widget.columnIndex]: widgetsByColumn
        }));
    };

    return <main className={styles.mainPageContainer}>
        <h1 className={styles.mainPageHeader}>Widgets</h1>
        <WidgetsController
            onAddWidget={onWidgetAdd}
            className={styles.widgetsController}
            cities={cities}
        />
        <WidgetsTable columnsCount={columnsCount} widgets={widgets} deleteWidget={deleteWidget} changeWidgetColumn={changeWidgetColumn}/>
    </main>
}