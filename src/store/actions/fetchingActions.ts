import {Action, Dispatch} from "redux";
import {IProductsFetchingState} from "../reducers/dataReducer";
import {IFetchAction} from "../reducers/fetchingReducer";
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../constants";

export interface ILoadedProductsAction extends Action {
    payload: IProductsFetchingState;
}

const dataLoaded = (data: IProductsFetchingState): ILoadedProductsAction =>
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

export const fetchData = (params:any, fetchParams?: any) => {
    console.log(params, fetchParams);
    return (dispatch:Dispatch) => {
        dispatch(dataRequested());
        fetch("http://localhost:9000/" + params, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchParams)
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((data:any) => dispatch(dataLoaded(data)))
            .catch((err) => dispatch(dataError(err)));
    }
};

export const fetchProductById = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(dataRequested());
        fetch("http://localhost:9000/products/" + id)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((product: any) => dispatch(dataLoaded(product)))
            .catch((err) => dispatch(dataError(err)));
    }
};
