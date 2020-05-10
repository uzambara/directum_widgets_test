import {IWeatherWidget, IWeatherWidgetData} from "../../models";
import {fetchUtil} from "../../utils";
import {YandexWeatherWidgetDataFactory} from "../../factories";
import {IYandexWeatherResponse} from "../../models-remote/yandex-weather-models";
import {IWeatherService} from "./weather-service-base";
import moment from "moment";

const API_URL = "https://localhost:5001/WeatherForecast";


export class YandexWeatherService implements IWeatherService {
    private static Cache: {[key: string]: IWeatherWidgetData} = {};
    private static GetCacheKey(widget: IWeatherWidget): string {
        let nowDate = moment().format("DD.MM.YYYY");
        return `${widget.city.id}_${nowDate}`;
    }

    public async getWeather(widget: IWeatherWidget): Promise<IWeatherWidgetData> {
        const cacheKey = YandexWeatherService.GetCacheKey(widget);
        const cachedData = YandexWeatherService.Cache[cacheKey];
        if(cachedData)
            return cachedData;

        const searchParams = {
            lat: widget.city.lat,
            lon: widget.city.lon
        };
        const response = await fetchUtil.get<IYandexWeatherResponse>(
            API_URL,
            searchParams);

        let result = YandexWeatherWidgetDataFactory.createWeatherWidgetData(response, widget);

        YandexWeatherService.Cache[cacheKey] = result;
        return result;
    }
}