import {WidgetType} from "../../enums";
import {IWeatherWidgetData} from "..";


export interface IWidget {
    id: string,
    type: WidgetType,
    columnIndex: number,
    initialData?: IWeatherWidgetData
}