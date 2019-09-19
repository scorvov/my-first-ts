import {baseURL} from "../constants";
import {ICreateProductValues} from "../../components/create-update-product/with-formik-product";
import {ICreatePropValues} from "../../components/create-prop/with-formik-prop";
import {IFetchParams} from "../models/IFetchParams";

type TFetchParams = ICreateProductValues | ICreatePropValues | IFetchParams;

export const fetchRequest = (method: string, path: string, params?: TFetchParams):Promise<Response> => {
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
