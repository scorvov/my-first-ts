import {Action} from "redux";
import {fetchData} from "./fetchingActions";
import {IProduct} from "../models/iProduct";
import {RESET_SELECT_PRODUCT} from "../constants";

export const resetSelectProduct = ():Action => {
    return {
        type: RESET_SELECT_PRODUCT
    };
};

export const productDelete = (id: number) => {
    return (dispatch:any) => {
        fetch( "http://localhost:9000/products/delete/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData('products'));
                }
            }));
    }
};

export const productCreate = (params: IProduct): any => {
    return (dispatch: any) => {
        fetch("http://localhost:9000/products/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData('products'));
                }
            }));
    }
};

export const productUpdate = (params: IProduct): any => {
    return (dispatch: any) => {
        fetch("http://localhost:9000/products/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData('products'));
                }
            }));
    }
};


