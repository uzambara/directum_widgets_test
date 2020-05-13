// @ts-nocheck
import React, {memo, useState} from "react";
import * as styles from "./widgets-controller.scss";
import {CurrencyType, TemperatureUnitType, WidgetType} from "../../enums";
import {useSelectInput} from "../../hooks";
import {Button, CurrencyRateWidgetSettings, Select, SelectItem, WeatherWidgetSettings} from "..";
import {ICity, ICurrencyRateWidget, IWeatherWidget, IWidget} from "../../models";
import {widgetUtils} from "../../utils";
import _ from "underscore";
import cn from "classnames";
import {Alert} from "@material-ui/lab";
import {ValidationResult} from "lakmus/src/results/validation-result";
import {CurrencyWidgetFactory, WeatherWidgetFactory} from "../../factories";


export interface IWidgetsControllerProps {
    onSubmit: (widget: IWidget) => void,
    onCancel?: () => void,
    className?: string,
    cities: ICity[],
    columnsCount: number,
    initialWidget?: IWidget,
    submitButtonText?: string

}

export function WidgetsControllerComponent(props: IWidgetsControllerProps) {
    const {onSubmit, className, cities, columnsCount, initialWidget, submitButtonText, onCancel} = props;
    const {value: columnIndex, onChange: onColumnIndexChange} = useSelectInput<number>(initialWidget?.columnIndex || 0);
    const [validateError, setValidateError] = useState(false);

    const {value: widgetType, onChange: onWidgetTypeChange} = useSelectInput<WidgetType>(initialWidget?.type || WidgetType.Weather);

    const weatherWidget = initialWidget as IWeatherWidget;
    const {value: cityId, onChange: onCityChange} = useSelectInput<number>(weatherWidget?.city?.id || -1);
    const {value: temperatureUnit, onChange: onTemperatureUnitChange} = useSelectInput<TemperatureUnitType>(weatherWidget?.temperatureUnit || TemperatureUnitType.Celsius);

    const currencyRateWidget = initialWidget as ICurrencyRateWidget;
    const {value: currency1, onChange: onCurrency1Change} = useSelectInput<CurrencyType>(currencyRateWidget?.currencyType1 || CurrencyType.USD);
    const {value: currency2, onChange: onCurrency2Change} = useSelectInput<CurrencyType>(currencyRateWidget?.currencyType2 || CurrencyType.USD);

    const addWidget = () => {
        let widget: IWidget = null;

        switch (widgetType) {
            case WidgetType.CurrencyRate:
                widget = CurrencyWidgetFactory.createCurrencyRateWidget({currencyType1: currency1, currencyType2: currency2, columnIndex});
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
            onSubmit(widget);
        }
    };

    return <section className={cn(styles.widgetsController, className)}>
        <Select value={columnIndex} onChange={onColumnIndexChange} labelText="Column number" className={styles.widgetsControllerInput}>
            {_.range(columnsCount).map(_columnIdx =>
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
        <div className={styles.buttonsAndAlertWrapper}>
            <div className={styles.buttonsWrapper}>
                <Button onClick={addWidget} className={styles.widgetsControllerButton} text={submitButtonText || "Add widget"}/>
                {onCancel && <Button onClick={onCancel} className={styles.widgetsControllerButton} text={"Cancel"}/>}
            </div>
            {validateError &&
            <Alert severity="error" className={styles.errorAlert}>
                Need to choose all fields.
            </Alert>
            }
        </div>
    </section>
}

export const WidgetsController = memo(WidgetsControllerComponent);