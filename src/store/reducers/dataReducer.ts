
import {IProduct} from "../models/iProduct";
import {IProp} from "../models/iProp";
import {Action} from "redux";
import {FETCH_SUCCESS, RESET_SELECT_PRODUCT} from "../constants";

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
        case FETCH_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case RESET_SELECT_PRODUCT:
            return {
                ...state,
                selectProduct: initialProductState.selectProduct
            };
        default:
            return state;
    }
};


