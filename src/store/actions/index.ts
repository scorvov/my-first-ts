import { Action } from "redux";
import {IProduct} from "../models/iProduct";

export interface ISetFetchingToSuccessPayload {
    productList: IProduct[];
}
export interface ISetFetchingToSuccess extends Action {
    payload: ISetFetchingToSuccessPayload;
}
export const SET_FETCHING_TO_SUCCESS = "SET_FETCHING_TO_SUCCESS";

export const setFetchingToSuccess = (productList: IProduct[]): ISetFetchingToSuccess =>
    ({
        payload: {
            productList
        },
        type: SET_FETCHING_TO_SUCCESS,
    });

// export const carsLoaded = (productList: any) => {
//     return {
//         type:'PRODUCTS_LOADED',
//         payload: productList
//     };
// };
