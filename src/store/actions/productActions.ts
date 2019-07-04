import {Action, Dispatch} from "redux";
import {carstoreService, fetchData} from "./fetchingActions";
import {IProduct} from "../models/iProduct";
import {RESET_SELECT_PRODUCT} from "../constants";


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



