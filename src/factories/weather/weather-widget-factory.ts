import {ICity, IWeatherWidget} from "../../models";
import {TemperatureUnitType, WidgetType} from "../../enums";
import {guid} from "../../utils";

export class WeatherWidgetFactory {
    public static createWeatherWidget(columnIndex: number, city: ICity, temperatureUnit: TemperatureUnitType): IWeatherWidget {
        return {
            id: guid(),
            city: city,
            type: WidgetType.Weather,
            columnIndex,
            temperatureUnit: temperatureUnit
        }
    }

    public static getDefaultWeatherWidget(): IWeatherWidget {
        return {
            id: guid(),
            city: undefined,
            columnIndex: 0,
            temperatureUnit: undefined,
            type: undefined
        }
    }
}