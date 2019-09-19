import {IProduct, IProductsList} from "../models/iProduct";
import {IPropsList} from "../models/iProp";
import {Action} from "redux";
import {EMPTY_SELECT_PRODUCT, FETCH_SUCCESS, RESET_SELECT_PRODUCT} from "../constants";

export interface IDataState {
    productsList: IProductsList;
    propsList: IPropsList;
    selectProduct?: IProduct;
}

const initialProductState: IDataState = {
    productsList: {
        items: [],
        count: 0,
        perPage: 25,
        currentPage: 0,
        order: 'desc',
        orderBy: 'id'
    },
    propsList: {
        items: [],
        count: 0,
        perPage: 25,
        currentPage: 0,
        order: 'desc',
        orderBy: 'id'
    },
};
const emptySelectProduct:IProduct = {
    id: 0,
    name:'',
    cost: 0,
    img: '',
    info:'',
    dateUp: new Date(),
    productProps: []
};
interface ILoadedProductsAction extends Action {
    payload: any;
}


export const dataReducer = (state: IDataState = initialProductState, action:ILoadedProductsAction) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case RESET_SELECT_PRODUCT:
            return {
                productsList: state.productsList,
                propsList: state.propsList
            };
        case EMPTY_SELECT_PRODUCT:
            return {
                ...state,
                selectProduct: emptySelectProduct
            };
        default:
            return state;
    }
};


