import {ICurrencyRateWidget} from "../../models";
import {WidgetType} from "../../enums";
import {guid} from "../../utils";

export class CurrencyWidgetFactory {
    public static createCurrencyRateWidget({
            currencyType1,
            currencyType2,
            columnIndex}: ICurrencyRateWidget): ICurrencyRateWidget {
        return {
            id: guid(),
            columnIndex,
            currencyType1: currencyType1,
            currencyType2: currencyType2,
            type: WidgetType.CurrencyRate
        }
    }

    public static getDefaultCurrencyRateWidget(): ICurrencyRateWidget {
        return {
            id: "",
            columnIndex: 0,
            currencyType1: undefined,
            currencyType2: undefined,
            type: undefined
        }
    }
}