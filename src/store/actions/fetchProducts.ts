import {Action, Dispatch} from "redux";
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
    payload: IProduct;
}
/*export interface ICreateProductAction extends Action {
    payload: ICreateProductValues;
}
export interface IDeleteProductAction extends Action {
    payload: number;
}*/
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const PRODUCT_SELECTED = "PRODUCT_SELECTED";
/*export const PRODUCT_DELETED = "PRODUCT_DELETED";
export const PRODUCT_CREATED = "PRODUCT_CREATED";*/

type TProductList = IProduct[] | undefined;
export const productsLoaded = (productList: TProductList): ILoadedProductsAction =>
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
    return (dispatch:Dispatch) => {
        dispatch(productsRequested());
        carstoreService.getProducts()
            .then((data:any) => dispatch(productsLoaded(data)))
            .catch((err) => dispatch(productsError(err)));
    }
};

export const productSelected = (product: IProduct): ISelectProductAction =>
    ({
        payload: product,
        type: PRODUCT_SELECTED
    });
export const fetchProductSelected = (id:number) => {
    return (dispatch:Dispatch) => {
        carstoreService.getProductById(id)
            .then((product:any) => dispatch(productSelected(product)))
            .catch((err) => dispatch(productsError(err)));
    }
};

// export const productDeleted = (id: number): IDeleteProductAction =>
//     ({
//         payload: id,
//         type: PRODUCT_DELETED
//     });

export const productDelete = (id:number) => {
    return (dispatch:Dispatch) => {
        carstoreService.deleteProduct(id)
            .then(((response:any) => {
                if(response.ok) {
                    // dispatch(productDeleted(id));
                    dispatch(fetchProducts());
                }
            }));
    }
};

/*export const productCreated = (paramsForCreateProduct:ICreateProductValues):ICreateProductAction =>
({
    payload: paramsForCreateProduct,
    type: PRODUCT_CREATED
});*/

export const productCreate = (paramsForCreateProduct: ICreateProductValues):any => {
    return (dispatch:Dispatch) => {
        carstoreService.createProduct(paramsForCreateProduct)
            .then(((response:any) => {
                if(response.ok) {
                    // dispatch(productCreated(paramsForCreateProduct));
                    dispatch(fetchProducts());
                }
            }));
    }
};



