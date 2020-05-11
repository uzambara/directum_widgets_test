import {ICity, IWeatherWidgetData, IWidget} from "../index";
import {TemperatureUnitType} from "../../enums";

export interface IWeatherWidget extends IWidget {
    city: ICity,
    temperatureUnit: TemperatureUnitType
}