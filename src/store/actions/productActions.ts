import {Dispatch} from "redux";
import {ICreateProductValues} from "../../components/pages/create-product";
import {carstoreService, fetchData} from "./fetchingActions";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";



export const productDelete = (id: number) => {
    return (dispatch: Dispatch) => {
        carstoreService.deleteProduct(id)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};

export const productCreate = (paramsForCreateProduct: ICreateProductValues): any => {
    return (dispatch: Dispatch) => {
        carstoreService.createProduct(paramsForCreateProduct)
            .then(((response: any) => {
                if (response.ok) {
                    dispatch(fetchData());
                }
            }));
    }
};



