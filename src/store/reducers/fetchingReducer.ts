import {
    ILoadedProductsAction,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_REQUEST} from "../actions/productActions";


//разобраться с типом для error
export interface IFetchingState {
    loading: boolean;
    error: any;
}

const initialFetchingState: IFetchingState = {
    loading: false,
    error: null,
};
type TProductAction = ILoadedProductsAction;

export const fetchingReducer = (state = initialFetchingState, action:TProductAction) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


