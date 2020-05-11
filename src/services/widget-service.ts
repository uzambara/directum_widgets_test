import {IWeatherWidget, IWidget} from "../models";
import {guid} from "../utils";
import {TemperatureUnitType, WidgetType} from "../enums";

const WIDGETS_STORE_KEY = "WIDGETS_STORE_KEY";

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

export class WidgetService {
    public static getWidgets(): {[columnIndex: number]: IWidget[]} {
        const widgets = localStorage.getItem(WIDGETS_STORE_KEY);

        if(!widgets) {
            return {}
        }

        return JSON.parse(widgets);
    }

    public static saveWidgets(widgets:  {[columnIndex: number]: IWidget[]}): void {
        if(!widgets) {
            return;
        }
        localStorage.setItem("WIDGETS_STORE_KEY", JSON.stringify(widgets));
    }
}