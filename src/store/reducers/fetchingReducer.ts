
import {Action} from "redux";
import {
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../constants";

//разобраться с типом для error
export interface IFetchingState {
    loading: boolean;
    error: string | null;
}
export interface IFetchAction extends Action {
    payload: string | null;
}

const initialFetchingState: IFetchingState = {
    loading: false,
    error: null,
};

export const fetchingReducer = (state = initialFetchingState, action:IFetchAction) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
        case FETCH_PRODUCT_BY_ID_SUCCESS:
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


