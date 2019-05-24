import {IProductsLoaded, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST} from "../actions/fetchProducts";
import {IProduct} from "../models/iProduct";

//разобраться с типом для error
export interface IProductsFetchingState {
    productList: IProduct[];
    loading: boolean;
    error: any;
}

const initialProductState: IProductsFetchingState = {
    productList: [],
    loading: true,
    error: null
};
type TProductAction = IProductsLoaded;

export const productsFetchReducer = (state: IProductsFetchingState = initialProductState, action:TProductAction) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                productList: [],
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                productList: action.payload,
                loading: false,
                error: null
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                productList: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


