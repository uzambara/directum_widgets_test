﻿export interface IYandexWeatherInfo {
    "lat": number,
    "lon": number,
    /***
     * Информация о часовом поясе.
     */
    "tzinfo": {
        /***
         * Часовой пояс в секундах от UTC.
         */
        "offset": number,
        /***
         * Название часового пояса.
         */
        "name": string,
        /***
         * Сокращенное название часового пояса.
         */
        "abbr": string,
        /***
         * Признак летнего времени.
         */
        "dst": boolean
    },
    /***
     * Норма давления для данной координаты (в мм рт. ст.).
     */
    "def_pressure_mm": number,
    /***
     * Норма давления для данной координаты (в гектопаскалях).
     */
    "def_pressure_pa": number,
    /***
     * Страница населенного пункта на сайте Яндекс.Погода
     */
    "url": string
}