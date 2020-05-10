import {IYandexWeatherForecastPart, IYandexWeatherForecastShortPart} from "./index";

export interface IYandexWeatherForecastParts {
    "night": IYandexWeatherForecastPart,
    "morning": IYandexWeatherForecastPart,
    "day": IYandexWeatherForecastPart,
    "evening": IYandexWeatherForecastPart,
    /***
     * 12-часовой прогноз на день.
     */
    "day_short": IYandexWeatherForecastShortPart,
    /***
     * 12-часовой прогноз на ночь текущих суток.
     */
    "night_short": IYandexWeatherForecastShortPart
}