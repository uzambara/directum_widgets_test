import {ICurrency, IWidget} from "../index";
import {CurrencyType} from "../../enums";

export interface ICurrencyRateWidget extends IWidget {
    currencyType1: CurrencyType,
    currencyType2: CurrencyType
}
