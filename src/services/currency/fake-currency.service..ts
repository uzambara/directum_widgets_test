import {ICurrencyRateService} from "./currency.service.base";
import {ICurrencyRateWidget, ICurrencyRateWidgetData} from "../../models";
import {FakeCurrencyWidgetDataFactory, ICurrencyWidgetDataFactory} from "../../factories";

export class FakeCurrencyService implements ICurrencyRateService {
    readonly widgetDataFactory: ICurrencyWidgetDataFactory<unknown>;

    constructor() {
        this.widgetDataFactory = new FakeCurrencyWidgetDataFactory();
    }
    async getCurrencyRate(widget: ICurrencyRateWidget): Promise<ICurrencyRateWidgetData> {
        return this.widgetDataFactory.createCurrencyRateWidgetData({}, widget);
    }
}