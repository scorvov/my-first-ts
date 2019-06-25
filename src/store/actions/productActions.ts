import {Action, Dispatch} from "redux";
import {IProduct} from "../models/iProduct";
import {ICreateProductValues} from "../../components/pages/create-product";
import {carstoreService, fetchData} from "./fetchingActions";

export interface ILoadedProductsAction extends Action {
    payload: any;
}

export interface ISelectProductAction extends Action {
    payload: IProduct;
}

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const PRODUCT_SELECTED = "PRODUCT_SELECTED";

export const productSelected = (product: IProduct): ISelectProductAction =>
    ({
        payload: product,
        type: PRODUCT_SELECTED
    });
export const fetchProductSelected = (id: number) => {
    return (dispatch: Dispatch) => {
        carstoreService.getProductById(id)
            .then((product: any) => dispatch(productSelected(product)))
    }
};

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



