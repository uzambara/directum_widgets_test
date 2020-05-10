import {YandexWeatherLang} from "../index";

export interface IYandexWeatherRequest {
    /***
     * Широта в градусах
     */
    lat: number,
    /***
     * Долгота в градусах.
     */
    lon: number,
    /***
     * Сочетания языка и страны, для которых будут возвращены данные погодных формулировок.
     */
    lang?: YandexWeatherLang,
    /***
     * Количество дней в прогнозе, включая текущий.
     */
    limit?: string,
    /***
     * Для каждого из дней ответ будет содержать прогноз погоды по часам.
     */
    hours: boolean,
    /***
     * Расширенная информация об осадках.
     */
    extra?: boolean
}