import {IDataState} from "../reducers/data-reducer";
import {IFetchAction} from "../reducers/fetching-reducer";
import {
    FETCH_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../constants";
import {authResponse} from "./auth-actions";
import { fetchRequest } from "./fetch-request";
import {Action, Dispatch} from "redux";
import {IFetchParams} from "../models/IFetchParams";

export interface ILoadedProductsAction extends Action {
    payload: IDataState;
}

export const fetchLoaded = (data: IDataState): ILoadedProductsAction => ({payload: data, type: FETCH_SUCCESS});
export const fetchRequested = (): Action => ({type: FETCH_REQUEST});
export const fetchError = (error: string): IFetchAction => ({payload: error, type: FETCH_FAILURE});

export const fetchData = (fetchTypeData: string, fetchParams: IFetchParams) => (dispatch: Dispatch) => {
    dispatch(fetchRequested());
    fetchRequest("POST", fetchTypeData, fetchParams)
        .then((response) => dispatch(authResponse(response)))
        .then((response) => response.json())
        .then((data) => dispatch(fetchLoaded(data)))
        .catch((err: string) => {
            dispatch(fetchError(err));
        })
};


export const fetchProductById = (id: number) => (dispatch: Dispatch) => {
    dispatch(fetchRequested());
    fetchRequest("GET", "products/" + id)
        .then((response) => dispatch(authResponse(response)))
        .then((response) => response.json())
        .then((data) => dispatch(fetchLoaded(data)))
        .catch((err: string) => {
            dispatch(fetchError(err))
        })
};
