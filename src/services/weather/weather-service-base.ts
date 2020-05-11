import {IWeatherWidget, IWeatherWidgetData} from "../../models";
import {IWeatherWidgetDataFactory} from "../../factories";

export interface IWeatherService {
    readonly  widgetDataFactory: IWeatherWidgetDataFactory<unknown>,
    getWeather(widget: IWeatherWidget): Promise<IWeatherWidgetData>;
}