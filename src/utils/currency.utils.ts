import {CurrencyType} from "../enums";
import {currencyImages} from "../images";

function getCurrencyImageByType(currencyType: CurrencyType): string {
    switch (currencyType) {
        case CurrencyType.EUR:
            return currencyImages.eur;
        case CurrencyType.USD:
            return currencyImages.usd;
        case CurrencyType.GBP:
            return currencyImages.gbp;
        case CurrencyType.UAH:
            return currencyImages.uah;
        default:
            return "";
    }
}

export const currencyUtils = {
    getCurrencyImageByType
};