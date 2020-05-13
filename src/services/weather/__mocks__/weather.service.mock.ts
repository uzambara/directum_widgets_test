import {IWeatherService} from "../weather-service-base";
import {IWeatherWidgetDataFactory} from "../../../factories";
import {IWeatherWidget, IWeatherWidgetData} from "../../../models";


export class WeatherServiceMock implements IWeatherService {
    readonly widgetDataFactory: IWeatherWidgetDataFactory<unknown>;
    getWeather: (widget: IWeatherWidget) => Promise<IWeatherWidgetData> = jest.fn();
}