import {INamedEntityWithId} from "../models";

const createSelectorByKey = <T extends INamedEntityWithId>(entities: Array<T>) => (key: any) => {
    let filteredByKey = entities.filter(entity => entity.id === key);
    if(filteredByKey.length > 0) {
        return filteredByKey[0];
    }
    return null;
};

export const entityUtils = {
    createSelectorByKey
};