import {IWeatherWidget, IWeatherWidgetData} from "../../models";

export interface IWeatherService {
    getWeather(widget: IWeatherWidget): Promise<IWeatherWidgetData>;
}