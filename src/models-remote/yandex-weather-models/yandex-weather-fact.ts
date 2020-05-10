import {PrecipitationType} from "../../enums";
import {
    YandexCloudness,
    YandexDayTime,
    YandexPrecipitationStrength,
    YandexSeason,
    YandexWeatherCondition,
    YandexWindDirection
} from "./index";

export interface IYandexWeatherFact {
    /***
     * Температура (°C).
     */
    "temp": number,
    /***
     * Ощущаемая температура (°C).
     */
    "feels_like": number,
    /***
     * Код иконки погоды. Иконка доступна по адресу https://yastatic.net/weather/i/icons/blueye/color/svg/<значение из поля icon>.svg
     */
    "icon": string,
    /***
     * Код расшифровки погодного описания. Возможные значения в IYandexWeatherConditionMap
     */
    "condition": YandexWeatherCondition

    /***
     * Скорость ветра (в м/с).
     */
    "wind_speed": number,
    /***
     * Скорость порывов ветра (в м/с).
     */
    "wind_gust": number,
    /***
     * 	Направление ветра. "c" - Штиль
     */
    "wind_dir": YandexWindDirection,
    /***
     * Давление (в мм рт. ст.).
     */
    "pressure_mm": number,
    /***
     * Давление (в гектопаскалях).
     */
    "pressure_pa": number,
    /***
     * Влажность воздуха (в процентах).
     */
    "humidity": number,
    /***
     * 	Светлое или темное время суток. Возможные значения: «d» — светлое время суток, «n» — темное время суток.
     */
    "daytime": YandexDayTime,
    /***
     * 	Признак полярного дня или ночи.
     */
    "polar": false,
    /***
     * 	Время года в данном населенном пункте. Возможные значения:
     */
    "season": YandexSeason,
    /***
     * Тип осадков.
     0 — без осадков.
     1 — дождь.
     2 — дождь со снегом.
     3 — снег.
     */
    "prec_type": PrecipitationType,
    /***
     * Сила осадков.
     */
    "prec_strength": YandexPrecipitationStrength,
    "cloudness": YandexCloudness,
    /***
     * Время замера погодных данных в формате Unixtime.
     */
    "obs_time": number
}