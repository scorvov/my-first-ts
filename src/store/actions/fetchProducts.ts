import { Action } from "redux";
import {IProduct} from "../models/iProduct";

export interface IProductsLoaded extends Action {
    payload: any;
}
export interface IErrorLoaded extends Action {
    payload: string;
}
export interface ISelectProduct extends Action {
    payload: number;
}
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const PRODUCT_SELECTED = "PRODUCT_SELECTED";
export const PRODUCT_DELETED = "PRODUCT_DELETED";


export const productsLoaded = (productList: IProduct[]): IProductsLoaded =>
    ({
        payload: productList,
        type: FETCH_PRODUCTS_SUCCESS
    });
export const productsRequested = ():Action => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};
export const productsError = (error:string): IErrorLoaded =>
    ({
        payload: error,
        type: FETCH_PRODUCTS_FAILURE
    });

export const productSelected = (id: number): ISelectProduct =>
    ({
        payload: id,
        type: PRODUCT_SELECTED
    });

export const productDeleted = (id: number): ISelectProduct =>
    ({
        payload: id,
        type: PRODUCT_DELETED
    });


