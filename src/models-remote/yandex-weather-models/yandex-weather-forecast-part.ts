import {PrecipitationType} from "../../enums";
import {
    YandexCloudness,
    YandexDayTime,
    YandexPrecipitationStrength,
    YandexWeatherCondition,
    YandexWindDirection
} from "./index";

export interface IYandexWeatherForecastPart {
    /***
     * Минимальная температура для времени суток (°C).
     */
    "temp_min": number,
    /***
     * Максимальная температура для времени суток (°C).
     */
    "temp_max": number,
    /***
     * Средняя температура для времени суток (°C).
     */
    "temp_avg": number,
    /***
     * Ощущаемая температура (°C).
     */
    "feels_like": number,
    /***
     * Код иконки погоды. Иконка доступна по адресу https://yastatic.net/weather/i/icons/blueye/color/svg/<значение из поля icon>.svg.
     */
    "icon": string,
    /***
     * Код расшифровки погодного описания.
     */
    "condition": YandexWeatherCondition,
    /***
     * Светлое или темное время суток.
     */
    "daytime": YandexDayTime,
    /***
     * Признак полярного дня или ночи.
     */
    "polar": false,
    /***
     * Скорость ветра (в м/с).
     */
    "wind_speed": 0.9,
    /***
     * Скорость порывов ветра (в м/с).
     */
    "wind_gust": 4,
    /***
     * Направление ветра.
     */
    "wind_dir": YandexWindDirection,
    /***
     * Давление (в мм рт. ст.).
     */
    "pressure_mm": 746,
    /***
     * Давление (в гектопаскалях).
     */
    "pressure_pa": 995,
    /***
     * Влажность воздуха (в процентах).
     */
    "humidity": 81,
    /***
     * Прогнозируемое количество осадков (в мм).
     */
    "prec_mm": 0,
    /***
     * Прогнозируемый период осадков (в минутах).
     */
    "prec_period": 360,
    /***
     * 	Тип осадков
     */
    "prec_type": PrecipitationType,
    "prec_strength": YandexPrecipitationStrength,
    "cloudness": YandexCloudness
}