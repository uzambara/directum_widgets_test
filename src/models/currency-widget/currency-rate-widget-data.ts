import {ICurrency} from "./currency";

export interface ICurrencyRateWidgetData {
    currency1: ICurrency,
    currency2: ICurrency,
    rate1: number,
    rate2: number
}