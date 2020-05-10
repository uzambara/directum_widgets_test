import {CurrencyType} from "../../enums";
import * as React from "react";
import {ChangeEvent, memo} from "react";
import {Select, SelectItem} from "../index";
export interface ICurrenciesSelectProps {
    currentCurrency: CurrencyType,
    onCurrencyChanged: (ev: ChangeEvent<{value: any}>) => void,
     className?: string
}

function CurrenciesSelectComponent(props: ICurrenciesSelectProps) {
    const {currentCurrency, onCurrencyChanged, className} = props;
    return <Select
        value={currentCurrency}
        onChange={onCurrencyChanged}
        labelText="Currency"
        className={className}
    >
        <SelectItem value={CurrencyType.USD}>USD</SelectItem>
        <SelectItem value={CurrencyType.EUR}>EUR</SelectItem>
        <SelectItem value={CurrencyType.GBP}>GBP</SelectItem>
        <SelectItem value={CurrencyType.UAH}>UAH</SelectItem>
    </Select>
}

export const CurrenciesSelect = memo(CurrenciesSelectComponent);