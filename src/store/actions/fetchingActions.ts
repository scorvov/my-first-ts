import {Action, Dispatch} from "redux";
import {IDataState} from "../reducers/data-reducer";
import {IFetchAction} from "../reducers/fetching-reducer";
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS,
    baseURL
} from "../constants";
import {authResponse} from "./auth-actions";

export interface ILoadedProductsAction extends Action {
    payload: IDataState;
}

const dataLoaded = (data: IDataState): ILoadedProductsAction =>
    ({
        payload: data,
        type: FETCH_SUCCESS
    });
const dataRequested = ():Action => {
    return {
        type: FETCH_REQUEST
    };
};
const dataError = (error:string): IFetchAction =>
    ({
        payload: error,
        type: FETCH_PRODUCTS_FAILURE
    });

export const fetchData = (fetchTypeData:any, fetchParams: any) => {
    return (dispatch:Dispatch) => {
        dispatch(dataRequested());
        fetch(baseURL + fetchTypeData, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify( fetchParams )
        })
            .then((response) => {
                authResponse(response, dispatch);
                return response.json()
            })
            .then((data:any) => {
                dispatch(dataLoaded(data))
            })
            .catch((err) => dispatch(dataError(err)));
    }
};

export const fetchProductById = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(dataRequested());
        fetch(baseURL + "products/" + id, {
            credentials: "include"
        })
            .then((response) => {
                authResponse(response, dispatch);
                return response.json()
            })
            .then((product) => dispatch(dataLoaded(product)))
            .catch((err) => dispatch(dataError(err)));
    }
};
