import {Validator} from "lakmus";
import {ICurrencyRateWidget} from "../../models";

export class CurrencyRateWidgetValidator extends Validator<ICurrencyRateWidget> {
    constructor() {
        super();
        this.ruleFor(obj => obj.currency1)
            .notNull()
            .withMessage("Choose currency 1.");
        this.ruleFor(obj => obj.currency2)
            .notNull()
            .withMessage("Choose currency 2.");
        this.ruleFor(obj => obj.columnIndex)
            .greaterThanOrEqual(0)
            .withMessage("Choose column index.")
    }
}