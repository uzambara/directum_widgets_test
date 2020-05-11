import {ICurrencyWidgetDataFactory} from "./currency-widget-data-factory-base";
import {ICurrencyRateWidget, ICurrencyRateWidgetData} from "../../models";
import {currencyUtils} from "../../utils";

export class  FakeCurrencyWidgetDataFactory implements ICurrencyWidgetDataFactory<any> {
    createCurrencyRateWidgetData(response: any, widget: ICurrencyRateWidget): ICurrencyRateWidgetData {
        return {
            rate1: 100,
            rate2: 80,
            currency1: {
                id: widget.currencyType1,
                displayName: widget.currencyType1,
                imageUrl: currencyUtils.getCurrencyImageByType(widget.currencyType1)
            },
            currency2: {
                id: widget.currencyType2,
                displayName: widget.currencyType2,
                imageUrl: currencyUtils.getCurrencyImageByType(widget.currencyType2)
            }
        };
    }
}