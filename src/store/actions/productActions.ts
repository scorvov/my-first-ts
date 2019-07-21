import {Action} from "redux";
import {fetchData} from "./fetchingActions";
import {IProduct} from "../models/iProduct";
import {baseURL, RESET_SELECT_PRODUCT} from "../constants";
import {authResponse} from "./auth-actions";

export const resetSelectProduct = (): Action => {
    return {
        type: RESET_SELECT_PRODUCT
    };
};

export const productDelete = (id: number, fetchParams: any) => {
    return (dispatch: any) => {
        fetch(baseURL + "products/delete/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => authResponse(response, dispatch))
            .then(() => dispatch(fetchData('products', fetchParams)))
    }
};

export const productCreate = (params: IProduct) => {
    return (dispatch: any) => {
        fetch(baseURL + "products/add", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then((response) => authResponse(response, dispatch))
            .then(() => console.log("Product created"))
    }
};

export const productUpdate = (params: IProduct) => {
    return (dispatch: any) => {
        fetch(baseURL + "products/update", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then((response) => authResponse(response, dispatch))
            .then(() => console.log("Product updated"))
    }
};



