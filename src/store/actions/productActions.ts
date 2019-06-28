import {Action, Dispatch} from "redux";
import {carstoreService, fetchData} from "./fetchingActions";
import {IProduct} from "../models/iProduct";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const RESET_SELECT_PRODUCT = "RESET_SELECT_PRODUCT";



export const productDelete = (id: number) => {
    return (dispatch: Dispatch) => {
        carstoreService.deleteProduct(id)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};

export const productCreate = (paramsForCreateProduct: IProduct): any => {
    return (dispatch: Dispatch) => {
        carstoreService.createProduct(paramsForCreateProduct)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};

export const productUpdate = (paramsForCreateProduct: IProduct): any => {
    return (dispatch: Dispatch) => {
        carstoreService.updateProduct(paramsForCreateProduct)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};

export const resetSelectProduct = ():Action => {
    return {
        type: RESET_SELECT_PRODUCT
    };
};



