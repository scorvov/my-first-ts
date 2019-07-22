import {Action} from "redux";
import {IDataState} from "../reducers/data-reducer";
import {IFetchAction} from "../reducers/fetching-reducer";
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../constants";
import {fetchRequest} from "./base-actions";

export interface ILoadedProductsAction extends Action {
    payload: IDataState;
}
export const fetchLoaded = (data: IDataState): ILoadedProductsAction =>({payload: data, type: FETCH_SUCCESS});
export const fetchRequested = ():Action => ({type: FETCH_REQUEST});
export const fetchError = (error:string): IFetchAction =>({payload: error,type: FETCH_PRODUCTS_FAILURE});

export const fetchData = (fetchTypeData:any, fetchParams: any) =>
     fetchRequest("POST", fetchTypeData, fetchParams);

export const fetchProductById = (id: number) =>
    fetchRequest("GET", "products/" + id);



