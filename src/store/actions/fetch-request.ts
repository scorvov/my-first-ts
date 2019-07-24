import {baseURL} from "../constants";

export const fetchRequest = (method: string, path: string, params?: any) => {
    return fetch(baseURL + path, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(params)
    })
};