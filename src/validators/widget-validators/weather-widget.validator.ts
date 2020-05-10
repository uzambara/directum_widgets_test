import {Validator} from "lakmus";
import {IWeatherWidget} from "../../models";

export class WeatherWidgetValidator extends Validator<IWeatherWidget> {
    constructor() {
        super();
        this.ruleFor(obj => obj.temperatureUnit)
            .notNull()
            .withMessage("Choose temperature unit.");
        this.ruleFor(obj => obj.city)
            .notEmpty()
            .withMessage("Choose city.");
        this.ruleFor(obj => obj.columnIndex)
            .notNull()
            .withMessage("Choose column index.")
    }
}