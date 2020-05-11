import {IWeatherWidget, IWeatherWidgetData} from "../../models";

export interface IWeatherWidgetDataFactory<TResponse> {
    createWeatherWidgetData(response: TResponse, widget: IWeatherWidget): IWeatherWidgetData;
}