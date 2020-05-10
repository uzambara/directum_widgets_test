import {TemperatureUnitType} from "../enums";

function getFarengatesFromCelsius(celsius: number) {
    return parseFloat((celsius * 9 / 5 + 32).toFixed(2));
}

function getTemperatureByUnitType(celsiusTemp: number, unitType: TemperatureUnitType) {
    switch (unitType) {
        case TemperatureUnitType.Fahrenheit:
            return getFarengatesFromCelsius(celsiusTemp).toFixed(0);
        case TemperatureUnitType.Celsius:
            return celsiusTemp.toFixed(2);
        default:
            return "unknown";
    }
}

function getTemperatureUnitHtml(temperatureUnit: TemperatureUnitType) {
    switch (temperatureUnit) {
        case TemperatureUnitType.Celsius:
            return "&#8451;";
        case TemperatureUnitType.Fahrenheit:
            return "&#8457;";
        default:
            return "unknown";
    }
}

export const unitUtils = {
    getFarengatesFromCelsius,
    getTemperatureUnitHtml,
    getTemperatureByUnitType
};