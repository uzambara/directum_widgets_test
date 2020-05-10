import {IYandexWeatherFact, IYandexWeatherForecast, IYandexWeatherInfo} from "./index";
import {IResponseError} from "../shared/response-error";

// export const IYandexWeatherConditionMap = {
//     "clear": WeatherType.Clear,
//     "partly-cloudy": WeatherType.PartlyCloudy,
//     "cloudy": WeatherType.Cloudy,
//     "overcast": WeatherType.Overcast,
//     "partly-cloudy-and-light-rain": WeatherType.PartlyCloudyAndLightRain,
//     "partly-cloudy-and-rain": WeatherType.PartlyCloudyAndRain,
//     "overcast-and-rain": WeatherType.OvercastAndRain,
//     "overcast-thunderstorms-with-rain": WeatherType.OvercastThunderstormsWithRain,
//     "cloudy-and-light-rain": WeatherType.CloudyAndLightRain,
//     "overcast-and-light-rain": WeatherType.OvercastAndLightRain,
//     "cloudy-and-rain": WeatherType.CloudyAndRain,
//     "overcast-and-wet-snow": WeatherType.OvercastAndWetSnow,
//     "partly-cloudy-and-light-snow": WeatherType.PartlyCloudyAndLightSnow,
//     "partly-cloudy-and-snow": WeatherType.PartlyCloudyAndSnow,
//     "overcast-and-snow": WeatherType.OvercastAndSnow,
//     "cloudy-and-light-snow": WeatherType.CloudyAndLightSnow,
//     "overcast-and-light-snow": WeatherType.OvercastAndLightSnow,
//     "cloudy-and-snow": WeatherType.CloudyAndSnow,
// };

export interface IYandexWeatherResponse extends IResponseError {
    /***
     * Время сервера в формате Unixtime.
     */
    "now": number,
    /***
     * 	Время сервера в UTC.
     */
    "now_dt": string,
    /***
     * Объект информации о населенном пункте.
     */
    "info": IYandexWeatherInfo,
    /***
     * Объект содержит информацию о погоде на данный момент.
     */
    "fact": IYandexWeatherFact,
    /***
     * Объект содержит данные прогноза погоды.
     */
    "forecasts": IYandexWeatherForecast[]
}