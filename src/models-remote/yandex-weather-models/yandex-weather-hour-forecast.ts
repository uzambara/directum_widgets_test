import {IYandexWeatherForecastShortPart} from "./yandex-weather-forecast-short-part";

export interface IYandexWeatherHourForecast extends IYandexWeatherForecastShortPart {
    /***
     * Значение часа, для которого дается прогноз (0-23), локальное время.
     */
    "hour": string,
    /***
     * Время прогноза в Unixtime.
     */
    "hour_ts": number
}
