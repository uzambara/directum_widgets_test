import {WidgetType} from "../../enums";


export interface IWidget {
    id: string,
    type: WidgetType,
    columnIndex: number
}