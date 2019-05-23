import {IProductsLoaded, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST} from "../actions";
import {IProduct} from "../models/iProduct";

//разобраться с типом для error
export interface IFetchingState {
    productList: IProduct[];
    loading: boolean;
    error: any;
}

const initialProductState: IFetchingState = {
    productList: [],
    loading: true,
    error: null
};
type TProductAction = IProductsLoaded;

export const productsFetchReducer = (state: IFetchingState = initialProductState, action:TProductAction) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                productList: [],
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                productList: action.payload,
                loading: false,
                error: null
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                productList: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


