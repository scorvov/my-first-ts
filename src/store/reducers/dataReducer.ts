import {IProduct, IProductsList} from "../models/iProduct";
import {IPropsList} from "../models/iProp";
import {Action} from "redux";
import {FETCH_SUCCESS, RESET_SELECT_PRODUCT} from "../constants";

export interface IProductsFetchingState {
    productsList: IProductsList;
    propsList: IPropsList;
    selectProduct: IProduct;
}

const initialProductState: IProductsFetchingState = {
    productsList: {
        products: [],
        count: 0,
        perPage: 5,
        currentPage: 0,
        order: 'desc',
        orderBy: 'id'
    },
    propsList: {
        props: [],
        count: 0,
        perPage: 5,
        currentPage: 0,
        order: 'desc',
        orderBy: 'id'
    },
    selectProduct: {
        id: 0,
        name:'',
        cost: 0,
        img: '',
        info:'',
        dateUp: new Date(),
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


