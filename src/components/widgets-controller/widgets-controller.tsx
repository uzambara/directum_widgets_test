// @ts-nocheck
import React, {memo, useState} from "react";
import * as styles from "./widgets-controller.scss";
import {CurrencyType, TemperatureUnitType, WidgetType} from "../../enums";
import {useSelectInput} from "../../hooks";
import {Button, CurrencyRateWidgetSettings, Select, SelectItem, WeatherWidgetSettings} from "..";
import {ICity, IWidget} from "../../models";
import {widgetUtils} from "../../utils";
import {appSettings} from "../../settings";
import _ from "underscore";
import cn from "classnames";
import {Alert} from "@material-ui/lab";
import {ValidationResult} from "lakmus/src/results/validation-result";
import {WeatherWidgetFactory} from "../../factories";


export interface IWidgetsControllerProps {
    onAddWidget: (widget: IWidget) => void,
    className?: string,
    cities: ICity[]
}

function WidgetsControllerComponent(props: IWidgetsControllerProps) {
    const {onAddWidget, className, cities} = props;
    const {value: columnIndex, onChange: onColumnIndexChange} = useSelectInput<number>(0);
    const [validateError, setValidateError] = useState(false);

    const {value: cityId, onChange: onCityChange} = useSelectInput<number>();
    const {value: currency1, onChange: onCurrency1Change} = useSelectInput<CurrencyType>(CurrencyType.USD);
    const {value: currency2, onChange: onCurrency2Change} = useSelectInput<CurrencyType>(CurrencyType.USD);
    const {value: temperatureUnit, onChange: onTemperatureUnitChange} = useSelectInput<TemperatureUnitType>(TemperatureUnitType.Celsius);
    const {value: widgetType, onChange: onWidgetTypeChange} = useSelectInput<WidgetType>(WidgetType.Weather);


    const addWidget = () => {
        let widget: IWidget = null;

        switch (widgetType) {
            case WidgetType.CurrencyRate:
                widget = widgetUtils.createCurrencyRateWidget({currency1, currency2, columnIndex});
                break;
            case WidgetType.Weather:
                const city = cities.find(c => c.id == cityId);
                widget = WeatherWidgetFactory.createWeatherWidget(columnIndex, city, temperatureUnit);
                break;
        }
        let validationResult: ValidationResult = widgetUtils.validateWidget(widget);


        if(!validationResult?.isValid) {
            setValidateError(true);
        } else {
            setValidateError(false);
            onAddWidget(widget);
        }
    };

    return <section className={cn(styles.widgetsController, className)}>
        <Select value={columnIndex} onChange={onColumnIndexChange} labelText="Column number" className={styles.widgetsControllerInput}>
            {_.range(appSettings.COUNT_OF_WIDGET_COLUMNS).map(_columnIdx =>
                <SelectItem key={_columnIdx} value={_columnIdx}>{_columnIdx + 1}</SelectItem>)}
        </Select>
        <Select
            value={widgetType || ""}
            onChange={onWidgetTypeChange}
            labelText="Widget type"
            className={styles.widgetsControllerInput}
        >
            <SelectItem value={WidgetType.Weather}>Weather</SelectItem>
            <SelectItem value={WidgetType.CurrencyRate}>Currency rate</SelectItem>
        </Select>

        {
            widgetType == WidgetType.CurrencyRate && <CurrencyRateWidgetSettings
                className={cn(styles.widgetsControllerInput, styles.widgetsControllerSettings)}
                currentCurrency1={currency1}
                currentCurrency2={currency2}
                onCurrency1Changed={onCurrency1Change}
                onCurrency2Changed={onCurrency2Change}
            />
            || widgetType == WidgetType.Weather && <WeatherWidgetSettings
                className={cn(styles.widgetsControllerInput, styles.widgetsControllerSettings)}
                currentCityId={cityId}
                onCityChanged={onCityChange}
                cities={cities}
                currentTemperatureUnitType={temperatureUnit}
                onTemperatureUnitsChanged={onTemperatureUnitChange}
            />
            || null
        }
        <div className={styles.buttonsWrapper}>
            <Button onClick={addWidget} className={styles.widgetsControllerSubmitButton} text="Add widget"/>
            {
                validateError &&
                <Alert severity="error">
                    Need to choose all fields.
                </Alert>
            }
        </div>
    </section>
}

export const WidgetsController = memo(WidgetsControllerComponent);