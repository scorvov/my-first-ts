import { Action } from "redux";
import {IProduct} from "../models/iProduct";
import { CarstoreService } from "../../services/carstore-service";
import { ICreateProductValues } from "../../components/pages/create-product";

const carstoreService = new CarstoreService();

export interface ILoadedProductsAction extends Action {
    payload: any;
}
export interface ILoadedErrorAction extends Action {
    payload: string;
}
export interface ISelectProductAction extends Action {
    payload: number;
}
export interface ICreateProductAction extends Action {
    payload: ICreateProductValues;
}
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const PRODUCT_SELECTED = "PRODUCT_SELECTED";
export const PRODUCT_DELETED = "PRODUCT_DELETED";
export const PRODUCT_CREATED = "PRODUCT_CREATED";


export const productsLoaded = (productList: IProduct[]): ILoadedProductsAction =>
    ({
        payload: productList,
        type: FETCH_PRODUCTS_SUCCESS
    });
export const productsRequested = ():Action => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
};
export const productsError = (error:string): ILoadedErrorAction =>
    ({
        payload: error,
        type: FETCH_PRODUCTS_FAILURE
    });

export const fetchProducts = ():any => {
    return (dispatch:any) => {
    dispatch(productsRequested());
    carstoreService.getProducts()
        .then((data:any) => dispatch(productsLoaded(data)))
        .catch((err) => dispatch(productsError(err)));
    }
};

export const productSelected = (id: number): ISelectProductAction =>
    ({
        payload: id,
        type: PRODUCT_SELECTED
    });

export const productDeleted = (id: number): ISelectProductAction =>
    ({
        payload: id,
        type: PRODUCT_DELETED
    });

export const productDelete = (id:number):any => {
    return (dispatch:any) => {
    carstoreService.deleteProduct(id)
        .then(((response:any) => {
            if(response.result === 0) {
                dispatch(productDeleted(id));
            }
        }));
    }
};

export const productCreated = (values:ICreateProductValues):ICreateProductAction => 
({
    payload: values,
    type: PRODUCT_CREATED
});



