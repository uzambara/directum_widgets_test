import {ChangeEvent, memo} from "react";
import * as React from "react";
import * as styles from "./currency-rate-widget-settings.scss";
import cn from "classnames";
import {CurrencyType} from "../../enums";
import {CurrenciesSelect} from "../index";

export interface ICurrencyRateWidgetSettingsProps {
    className?: any,
    currentCurrency1: CurrencyType,
    onCurrency1Changed: (ev: ChangeEvent<{value: any}>) => void,
    currentCurrency2: CurrencyType,
    onCurrency2Changed: (ev: ChangeEvent<{value: any}>) => void
}

function CurrencyRateWidgetSettingsComponent(props: ICurrencyRateWidgetSettingsProps) {
    const {
        currentCurrency1,
        onCurrency1Changed,
        currentCurrency2,
        onCurrency2Changed,
        className
    } = props;

    return <div className={cn(styles.currencyRateWidgetSettings, className)}>
        <CurrenciesSelect currentCurrency={currentCurrency1} onCurrencyChanged={onCurrency1Changed} className={styles.currencyInput}/>
        <CurrenciesSelect currentCurrency={currentCurrency2} onCurrencyChanged={onCurrency2Changed} className={styles.currencyInput}/>
    </div>
}

export const CurrencyRateWidgetSettings = memo(CurrencyRateWidgetSettingsComponent);