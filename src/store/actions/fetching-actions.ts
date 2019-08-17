import {Action} from "redux";
import {IDataState} from "../reducers/data-reducer";
import {IFetchAction} from "../reducers/fetching-reducer";
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../constants";
import {authResponse} from "./auth-actions";
import { fetchRequest } from "./fetch-request";

export interface ILoadedProductsAction extends Action {
    payload: IDataState;
}

export const fetchLoaded = (data: IDataState): ILoadedProductsAction => ({payload: data, type: FETCH_SUCCESS});
export const fetchRequested = (): Action => ({type: FETCH_REQUEST});
export const fetchError = (error: string): IFetchAction => ({payload: error, type: FETCH_PRODUCTS_FAILURE});

export const fetchData = (fetchTypeData: string, fetchParams: any) => (dispatch: any) => {
    dispatch(fetchRequested());
    fetchRequest("POST", fetchTypeData, fetchParams)
        .then((response) => dispatch(authResponse(response)))
        .then((response) => response.json())
        .then((data) => dispatch(fetchLoaded(data)))
        .catch((err: string) => {
/*            dispatch(enqueueSnackbar({
                message: "Внутренняя ошибка, не удалось загрузить данные",
                variant: "error"
            }));*/
            dispatch(fetchError(err));
        })
};


export const fetchProductById = (id?: number) => (dispatch: any) => {
    dispatch(fetchRequested());
    fetchRequest("GET", "products/" + id)
        .then((response) => dispatch(authResponse(response)))
        .then((response) => response.json())
        .then((data) => dispatch(fetchLoaded(data)))
        .catch((err: string) => {
/*            dispatch(enqueueSnackbar({
                message: "Внутренняя ошибка, не удалось загрузить данные",
                variant: "error"
            }));*/
            dispatch(fetchError(err))
        })
};