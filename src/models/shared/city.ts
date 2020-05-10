import {INamedEntityWithId} from "../index";

export interface ICity extends INamedEntityWithId {
    lon: string,
    lat: string,

}