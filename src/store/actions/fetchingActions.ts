import {Action, Dispatch} from "redux";
import { CarstoreService } from "../../services/carstore-service";
import {IProductsFetchingState} from "../reducers/dataFetchReducer";

export const carstoreService = new CarstoreService();

export interface ILoadedProductsAction extends Action {
    payload: IProductsFetchingState;
}
export interface ILoadedErrorAction extends Action {
    payload: string;
}

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

const dataLoaded = (data: IProductsFetchingState): ILoadedProductsAction =>
    ({
        payload: data,
        type: FETCH_PRODUCTS_SUCCESS
    });
const dataRequested = ():Action => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};
const dataError = (error:string): ILoadedErrorAction =>
    ({
        payload: error,
        type: FETCH_PRODUCTS_FAILURE
    });

export const fetchData = ():any => {
    return (dispatch:Dispatch) => {
        dispatch(dataRequested());
        carstoreService.getData()
            .then((data:any) => dispatch(dataLoaded(data)))
            .catch((err) => dispatch(dataError(err)));
    }
};


