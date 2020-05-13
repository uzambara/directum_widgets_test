import {act} from "react-dom/test-utils";

jest.mock("../../../utils/guid.utils");
import {shallow} from "enzyme";
import React from "react";
import {CurrencyRateWidgetSettings, WeatherWidgetSettings, WidgetsController} from "../../index";
import {ICity, IWeatherWidget} from "../../../models";
import renderer from "react-test-renderer";
import {TemperatureUnitType, WidgetType} from "../../../enums";
import {WidgetsControllerComponent} from "../../index";
import {widgetUtils} from "../../../utils";
import {ValidationResult} from "lakmus";
import {Alert} from "@material-ui/lab";

const CITIES: ICity[] = [
    {id: "id1", displayName: "city1", lon: "lon1", lat: "lat1"},
    {id: "id2", displayName: "city2", lon: "lon2", lat: "lat2"},
    {id: "id3", displayName: "city3", lon: "lon2", lat: "lat3"}
];

const onSubmitMock = jest.fn();
const onCancelMock = jest.fn();
const className = "className";

describe("widgets controller tests", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("Render", () => {
        // Arrange
        const columnsCount = 2;
        let submitButtonText = "OK";
        let initialWidget: IWeatherWidget = {
            city: CITIES[0],
            columnIndex: 0,
            id: "123",
            temperatureUnit: TemperatureUnitType.Fahrenheit,
            type: WidgetType.Weather

        };

        // Act
        const snapshot = renderer.create(<WidgetsController
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
            onCancel={onCancelMock}
            className={className}
            submitButtonText={submitButtonText}
            initialWidget={initialWidget}
        />).toJSON();

        // Asserts
        expect(snapshot).toMatchSnapshot();
    });

    it("Меняет значение колонки", async () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
        />);

        // Act
        let columnNumberSelect = component.find('[labelText="Column number"]');
        act(() => {
            columnNumberSelect.props().onChange({target: {value: 999}} as any);
        });

        // Asserts
        columnNumberSelect = component.find('[labelText="Column number"]');
        expect(columnNumberSelect.props().value).toBe(999);
    });

    it("Меняет значение типа виджета", async () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
        />);

        // Act
        let widgetTypeSelect = component.find('[labelText="Widget type"]');
        act(() => {
            widgetTypeSelect.props().onChange({target: {value: 888}} as any);
        });

        // Asserts
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        expect(widgetTypeSelect.props().value).toBe(888);
    });

    it("Рендерит нужный контрол в зависимости от типа виджета", async () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
        />);

        // Act
        let widgetTypeSelect = component.find('[labelText="Widget type"]');
        act(() => {
            widgetTypeSelect.props().onChange({target: {value: -1}} as any);
        });

        // Asserts
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        expect(widgetTypeSelect.props().value).toBe(-1);
        expect(component.find(CurrencyRateWidgetSettings)).toHaveLength(0);
        expect(component.find(WeatherWidgetSettings)).toHaveLength(0);


        // Act
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        act(() => {
            widgetTypeSelect.props().onChange({target: {value: WidgetType.Weather}} as any);
        });

        // Asserts
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        expect(widgetTypeSelect.props().value).toBe(WidgetType.Weather);
        expect(component.find(CurrencyRateWidgetSettings)).toHaveLength(0);
        expect(component.find(WeatherWidgetSettings)).toHaveLength(1);


        // Act
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        act(() => {
            widgetTypeSelect.props().onChange({target: {value: WidgetType.CurrencyRate}} as any);
        });

        // Asserts
        widgetTypeSelect = component.find('[labelText="Widget type"]');
        expect(widgetTypeSelect.props().value).toBe(WidgetType.CurrencyRate);
        expect(component.find(CurrencyRateWidgetSettings)).toHaveLength(1);
        expect(component.find(WeatherWidgetSettings)).toHaveLength(0);
    });

    it("Рендерит кнопку Cancel, если передан обоработчик. Вызывает обработчик при нажатии на нее.", () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
            onCancel={onCancelMock}
        />);

        // Act
        const cancelButton = component.find('[text="Cancel"]');
        expect(cancelButton).toHaveLength(1);
        act(() => {
            cancelButton.props().onClick(null);
        });

        // Asserts
        expect(onCancelMock).toHaveBeenCalled();
    });

    it("Рендерит кнопку Submit. Вызывает обработчик при нажатии на нее если прошла валидация.", () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
            onCancel={onCancelMock}
            submitButtonText="Submit"
        />);

        // Act
        const submitButton = component.find('[text="Submit"]');
        expect(submitButton).toHaveLength(1);
        widgetUtils.validateWidget = jest.fn().mockImplementation((): ValidationResult => ({
            isValid: true,
            errors: null
        }));
        act(() => {
            submitButton.props().onClick(null);
        });

        // Asserts
        expect(onSubmitMock).toHaveBeenCalled();
    });

    it("Рендерит ошибку и не вызывает обработчик при нажатии на нее если валидация не прошла.", () => {
        // Arrange
        const columnsCount = 2;
        const component = shallow(<WidgetsControllerComponent
            cities={CITIES}
            columnsCount={columnsCount}
            onSubmit={onSubmitMock}
            onCancel={onCancelMock}
            submitButtonText="Submit"
        />);

        // Act
        const submitButton = component.find('[text="Submit"]');
        expect(submitButton).toHaveLength(1);
        widgetUtils.validateWidget = jest.fn().mockImplementation((): ValidationResult => ({
            isValid: false,
            errors: [{} as any]
        }));
        act(() => {
            submitButton.props().onClick(null);
        });

        // Asserts
        expect(onSubmitMock).not.toHaveBeenCalled();
        const errorAlert = component.find(Alert);
        expect(errorAlert).toHaveLength(1);
        expect(errorAlert.text()).toBe("Need to choose all fields.");
    });
});