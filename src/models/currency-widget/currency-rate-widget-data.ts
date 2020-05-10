import {ICurrency} from "../index";

export interface ICurrencyRateWidgetData {
    currencyType1: ICurrency,
    currencyType2: ICurrency,
    rate1: number,
    rate2: number
}