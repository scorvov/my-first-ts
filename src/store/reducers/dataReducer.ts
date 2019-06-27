import {FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_BY_ID_SUCCESS} from "../actions/productActions";
import {IProduct} from "../models/iProduct";
import {IProp} from "../models/iProp";
import {Action} from "redux";

//разобраться с типом для error
export interface IProductsFetchingState {
    productsList: IProduct[];
    propsList: IProp[],
    selectProduct: IProduct;
}

const initialProductState: IProductsFetchingState = {
    productsList: [],
    propsList: [],
    selectProduct: {
        id: 0,
        name:'',
        cost: '',
        img: '',
        info:'',
        dateUp: new Date().toLocaleDateString(),
        productProps: []
    }
};
interface ILoadedProductsAction extends Action {
    payload: any;
}


export const dataReducer = (state: IProductsFetchingState = initialProductState, action:ILoadedProductsAction) => {
    switch (action.type) {
        case FETCH_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                selectProduct: action.payload
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};


