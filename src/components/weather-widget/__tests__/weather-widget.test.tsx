import {mount, ReactWrapper} from "enzyme";
import {IWeatherWidgetProps, WeatherWidget} from "../../index";
import {IWeatherWidget, IWeatherWidgetData} from "../../../models";
import {TemperatureUnitType, WidgetType} from "../../../enums";
import React from "react";
import {WeatherServiceMock} from "../../../services/weather/__mocks__/weather.service.mock";
import {act} from "react-dom/test-utils";
import renderer from 'react-test-renderer';


const weatherServiceMock = new WeatherServiceMock();
const onEditWidget = jest.fn();
const onDeleteWidget = jest.fn();
const DEFAULT_WEATHER_WIDGET: IWeatherWidget = {
    city: {
        displayName: "displayName",
        id: "id",
        lat: "lat",
        lon: "lon"
    },
    temperatureUnit: TemperatureUnitType.Celsius,
    columnIndex: 0,
    id: "1",
    type: WidgetType.Weather
};

describe("weather widget tests", () => {
    let defaultWeatherWidget: IWeatherWidget;
    beforeEach(() => {
        jest.resetAllMocks();
        weatherServiceMock.getWeather = jest.fn().mockImplementation(() => {
            return new Promise(resolve => {
                let weatherWidgetData: IWeatherWidgetData = {
                    cityName: "cityName",
                    currentDate: "currentDate",
                    currentTime: "currentTime",
                    humidity: "humidity",
                    pressure: "pressure",
                    speedOfWind: "speedOfWind",
                    temperature: "temperature",
                    temperatureFeelsLike: "temperatureFeelsLike",
                    weatherIconUrl: "weatherIconUrl",
                    weatherType: "weatherType"

                };
                return resolve(weatherWidgetData);
            });
        });
        defaultWeatherWidget = DEFAULT_WEATHER_WIDGET;
    });

    it("render", () => {
        // Act
        const snapshot = renderer
            .create(<WeatherWidget
                widget={defaultWeatherWidget}
                weatherService={weatherServiceMock}
                onEditWidget={onEditWidget}
                onDeleteWidget={onDeleteWidget}
            />)
            .toJSON();

        // Asserts
        expect(snapshot).toMatchSnapshot();
    });

    it("первый рендер инициализирует данные виджета через сервис", async () => {
        // Arrange
        let component: ReactWrapper<IWeatherWidgetProps>;

        // Act
        await act(async () => {
            component = mount(<WeatherWidget
                widget={defaultWeatherWidget}
                weatherService={weatherServiceMock}
                onEditWidget={onEditWidget}
                onDeleteWidget={onDeleteWidget}
            />);
        });

        // Asserts
        expect(weatherServiceMock.getWeather).toHaveBeenCalledWith(defaultWeatherWidget);
    });
});