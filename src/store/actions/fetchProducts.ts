import { Action } from "redux";
import {IProduct} from "../models/iProduct";

export interface IProductsLoaded extends Action {
    payload: IProduct[];
}
export interface IErrorLoaded extends Action {
    payload: string;
}
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const productsLoaded = (productList: IProduct[]): IProductsLoaded =>
    ({
        payload: productList,
        type: FETCH_PRODUCTS_SUCCESS,
    });
export const productsRequested = ():Action => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};
export const productsError = (error:string): IErrorLoaded => {
    return {
        payload: error,
        type: FETCH_PRODUCTS_FAILURE
    };
};


