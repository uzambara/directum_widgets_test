import {IYandexWeatherFact} from "./index";

export interface IYandexWeatherForecastShortPart extends IYandexWeatherFact {
    "_fallback_temp": boolean,
    "_fallback_prec": boolean
}