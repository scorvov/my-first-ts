import {Action, Dispatch} from "redux";
import { CarstoreService } from "../../services/carstore-service";
import {IProductsFetchingState} from "../reducers/dataReducer";
import {IFetchAction} from "../reducers/fetchingReducer";
import {IProduct} from "../models/iProduct";
import {
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../constants";


export const carstoreService = new CarstoreService();

export interface ILoadedProductsAction extends Action {
    payload: IProductsFetchingState;
}
export interface ISelectProductAction extends Action {
    payload: IProduct;
}

const dataLoaded = (data: IProductsFetchingState): ILoadedProductsAction =>
    ({
        payload: data,
        type: FETCH_PRODUCTS_SUCCESS
    });
const productLoaded = (product: IProduct): ISelectProductAction =>
    ({
        payload: product,
        type: FETCH_PRODUCT_BY_ID_SUCCESS
    });
const dataRequested = ():Action => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};
const dataError = (error:string): IFetchAction =>
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

export const fetchProductById = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(dataRequested());
        carstoreService.getProductById(id)
            .then((product: any) => dispatch(productLoaded(product)))
            .catch((err) => dispatch(dataError(err)));
    }
};
