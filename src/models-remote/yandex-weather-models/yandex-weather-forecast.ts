import {IYandexWeatherForecastParts, IYandexWeatherHourForecast} from "./index";

export interface IYandexWeatherForecast {
    /***
     * Дата прогноза в формате ГГГГ-ММ-ДД.
     */
    "date": string,
    /***
     * Дата прогноза в формате Unixtime.
     */
    "date_ts": number,
    /***
     * Порядковый номер недели.
     */
    "week": number,
    /***
     * Время восхода Солнца, локальное время (может отсутствовать для полярных регионов).
     */
    "sunrise": string,
    /***
     * Время заката Солнца, локальное время (может отсутствовать для полярных регионов).
     */
    "sunset": string,
    /***
     * 	Код фазы Луны.
     */
    "moon_code": number,
    /***
     * Текстовый код для фазы Луны
     */
    "moon_text": string,
    /***
     * Прогнозы по времени суток и 12-часовые прогнозы.
     */
    "parts": IYandexWeatherForecastParts,
    /***
     * Объект почасового прогноза погоды. Содержит 24 части
     */
    "hours": IYandexWeatherHourForecast[]
}