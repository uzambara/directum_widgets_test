// @ts-nocheck

import {ChangeEvent, memo} from "react";
import * as React from "react";
import {ICity} from "../../models";
import cn from "classnames";
import * as styles from "./weather-widget-settings.scss";
import {TemperatureUnitType} from "../../enums";
import {Select, SelectItem, TemperatureUnitsSelect} from "../index";

export interface IWeatherWidgetSettingsProps {
    className?: any,
    onCityChanged: (ev: ChangeEvent<{value: any}>) => void,
    currentCityId: number,
    onTemperatureUnitsChanged: (ev: ChangeEvent<{value: any}>) => void,
    currentTemperatureUnitType: TemperatureUnitType,
    cities: ICity[]
}

function WeatherWidgetSettingsComponent(props: IWeatherWidgetSettingsProps) {
    const {
        className,
        currentCityId,
        onCityChanged,
        cities,
        onTemperatureUnitsChanged,
        currentTemperatureUnitType,
    } = props;


    return <div className={cn(styles.weatherWidgetSettings, className)}>
        <Select
            className={styles.weatherWidgetControlInput}
            labelText="City"
            value={currentCityId}
            onChange={onCityChanged}
        >
            {cities.map((_city) =>
                <SelectItem key={_city?.id} value={_city?.id}>{_city?.displayName}</SelectItem>)}
        </Select>
        <TemperatureUnitsSelect
            temperatureUnit={currentTemperatureUnitType}
            onTemperatureUnitChanged={onTemperatureUnitsChanged}
            className={styles.weatherWidgetControlInput}
        />
    </div>
}

export const WeatherWidgetSettings = memo(WeatherWidgetSettingsComponent);