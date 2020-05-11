import {ICurrencyRateWidget, ICurrencyRateWidgetData} from "../../models";

export interface ICurrencyWidgetDataFactory<TResponse> {
    createCurrencyRateWidgetData(response: TResponse, widget: ICurrencyRateWidget): ICurrencyRateWidgetData;
}