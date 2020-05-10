import {TemperatureUnitType} from "../../enums";
import {ChangeEvent, default as React, memo} from "react";
import {unitUtils} from "../../utils";
import {Select, SelectItem} from "../index";


export interface ITemperatureUnitsSelectProps {
    temperatureUnit: TemperatureUnitType,
    onTemperatureUnitChanged: (ev: ChangeEvent<{value: any}>) => void,
    className?: string
}

function TemperatureUnitsSelectComponent(props: ITemperatureUnitsSelectProps) {
    const {temperatureUnit, onTemperatureUnitChanged, className} = props;

    return <Select
        value={temperatureUnit}
        onChange={onTemperatureUnitChanged}
        labelText="Temp. unit"
        className={className}
    >
        <SelectItem value={TemperatureUnitType.Celsius}>
            <span dangerouslySetInnerHTML={{__html: unitUtils.getTemperatureUnitHtml(TemperatureUnitType.Celsius)}}/>
        </SelectItem>
        <SelectItem value={TemperatureUnitType.Fahrenheit}>
            <span dangerouslySetInnerHTML={{__html: unitUtils.getTemperatureUnitHtml(TemperatureUnitType.Fahrenheit)}}/>
        </SelectItem>
    </Select>
}

export const TemperatureUnitsSelect = memo(TemperatureUnitsSelectComponent);