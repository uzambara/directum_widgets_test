import {IWeatherWidget, IWeatherWidgetData} from "../../models";
import {IYandexWeatherResponse} from "../../models-remote/yandex-weather-models";
import moment from "moment";
import {unitUtils} from "../../utils";
import {IWeatherWidgetDataFactory} from "./weather-widget-data-factory-base";

function getIconUrl(iconName: string) {
    return `https://yastatic.net/weather/i/icons/blueye/color/svg/${iconName}.svg`
}

export class YandexWeatherWidgetDataFactory implements IWeatherWidgetDataFactory<IYandexWeatherResponse> {
    public createWeatherWidgetData(yandexResponse: IYandexWeatherResponse, widget: IWeatherWidget): IWeatherWidgetData {
        const localtime = moment((yandexResponse.now + yandexResponse.info.tzinfo.offset) * 1000);
        const {fact} = yandexResponse;

        const currentTemperature = unitUtils.getTemperatureByUnitType(fact.temp, widget.temperatureUnit);
        const currentTemperatureFeelsLike = unitUtils.getTemperatureByUnitType(fact.feels_like, widget.temperatureUnit);
        const temperatureUtilsString = unitUtils.getTemperatureUnitHtml(widget.temperatureUnit);
        return {
            cityName: widget.city.displayName,
            currentDate: localtime.format("dddd"),
            temperature: currentTemperature + " " + temperatureUtilsString,
            temperatureFeelsLike: currentTemperatureFeelsLike + " " + temperatureUtilsString,
            weatherIconUrl: getIconUrl(fact.icon),
            speedOfWind: fact.wind_speed + " м/с",
            currentTime: localtime.format("HH:mm"),
            weatherType: fact.condition,
            humidity: fact.humidity + " %",
            pressure: fact.pressure_mm + " мм.рт.ст.",
        }
    }
}