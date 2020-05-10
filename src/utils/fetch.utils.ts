import {IResponseError} from "../models-remote/shared/response-error";

const defaultGetOptions: RequestInit = {
    method: "GET"
};

const defaultPostOptions: RequestInit = {
    method: "POST"
};

function getURLSearchParamsFromObject (queryObject: {[key: string]: any}) {
    let result = new URLSearchParams();
    if(queryObject) {
        Object.keys(queryObject).forEach((key) => result.append(key, queryObject[key]));
    }
    return result;
}

async function get<TResponse extends IResponseError>(url: string, queryObject?: {[key: string]: any}, requestInit?: RequestInit): Promise<TResponse> {
    const searchParams = getURLSearchParamsFromObject(queryObject);
    const requestUrl = url + '?' + searchParams.toString();
    try {
        let response = await fetch(requestUrl, {
            ...defaultGetOptions,
            ...requestInit
        });

        if(response.ok) {
            return (await response.json() as TResponse);
        }

        console.log(`${url}`, `Сервер ответил с ошибкой: ${response.statusText} url: ${requestUrl}`);
        return {
            error: response.statusText,
            body: await response.text(),
            url: url
        } as any;
    } catch (error) {
        return {
            error: error,
            url: url
        } as any;
    }

}

async function post<TResponse extends IResponseError>(url: string, data?: any, requestInit?: RequestInit): Promise<TResponse | IResponseError> {
    try {
        let body = data ? JSON.stringify(data) : null;
        let response = await fetch(url, {
            ...defaultPostOptions,
            body: body,
            ...requestInit
        });

        if(response.ok) {
            return (await response.json() as TResponse);
        }

        console.log(`${url}`, `Сервер ответил с ошибкой: ${response.statusText} url: ${url}`);
        return {
            error: response.statusText,
            body: await response.text(),
            url: url
        } as any;
    } catch (error) {
        return {
            error: error,
            url: url
        } as any;
    }
}

export const fetchUtil = {
    get,
    post
};
