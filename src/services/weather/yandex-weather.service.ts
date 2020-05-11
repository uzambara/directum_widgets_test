import {IWeatherWidget, IWeatherWidgetData} from "../../models";
import {fetchUtil} from "../../utils";
import {IWeatherWidgetDataFactory, YandexWeatherWidgetDataFactory} from "../../factories";
import {IYandexWeatherResponse} from "../../models-remote/yandex-weather-models";
import {IWeatherService} from "./weather-service-base";
import moment from "moment";


const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:33889/weather-server/WeatherForecast"
    : "http://91.146.47.187:33889/weather-server/WeatherForecast";


export class YandexWeatherService implements IWeatherService {
    private static Cache: {[key: string]: IYandexWeatherResponse} = {};
    private static GetCacheKey(widget: IWeatherWidget): string {
        let nowDate = moment().format("DD.MM.YYYY");
        return `${widget.city.id}_${nowDate}`;
    }
    readonly widgetDataFactory: IWeatherWidgetDataFactory<IYandexWeatherResponse>;

    constructor() {
        this.widgetDataFactory = new YandexWeatherWidgetDataFactory();
    }

    public async getWeather(widget: IWeatherWidget): Promise<IWeatherWidgetData> {
        const cacheKey = YandexWeatherService.GetCacheKey(widget);
        const cachedResponse = YandexWeatherService.Cache[cacheKey];
        if(cachedResponse) {
            return this.widgetDataFactory.createWeatherWidgetData(cachedResponse, widget);
        }

        const searchParams = {
            lat: widget.city.lat,
            lon: widget.city.lon
        };
        const response = await fetchUtil.get<IYandexWeatherResponse>(
            API_URL,
            searchParams);

        YandexWeatherService.Cache[cacheKey] = response;
        return this.widgetDataFactory.createWeatherWidgetData(response, widget);
    }


}