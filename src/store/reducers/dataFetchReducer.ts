import {
    ILoadedProductsAction,
    FETCH_PRODUCTS_SUCCESS,
    PRODUCT_SELECTED} from "../actions/productActions";
import {IProduct} from "../models/iProduct";
import {IProp} from "../models/iProp";

//разобраться с типом для error
export interface IProductsFetchingState {
    productList: IProduct[];
    propsList: IProp[],
    selectProduct?: IProduct;
}

const initialProductState: IProductsFetchingState = {
    productList: [],
    propsList: [],
    // selectProduct: undefined
};
type TProductAction = ILoadedProductsAction;

export const dataFetchReducer = (state: IProductsFetchingState = initialProductState, action:TProductAction) => {
    switch (action.type) {
        case PRODUCT_SELECTED:
            return {
                ...state,
                selectProduct: action.payload
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                productList: action.payload.products,
                propsList: action.payload.props,
            };
        default:
            return state;
    }
};


