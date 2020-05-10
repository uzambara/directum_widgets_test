import {IWidget} from "../index";
import {CurrencyType} from "../../enums";

export interface ICurrencyRateWidget extends IWidget {
    currency1: CurrencyType,
    currency2: CurrencyType
}
