import {ICurrencyRateWidget, ICurrencyRateWidgetData} from "../../models";
import {ICurrencyWidgetDataFactory} from "../../factories";

export interface ICurrencyRateService {
    readonly  widgetDataFactory: ICurrencyWidgetDataFactory<unknown>,
    getCurrencyRate(widget: ICurrencyRateWidget): Promise<ICurrencyRateWidgetData>
}