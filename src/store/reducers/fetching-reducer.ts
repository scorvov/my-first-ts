import {
    FETCH_BY_ID_SUCCESS,
    FETCH_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../constants";
import {Action} from "redux";

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
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SUCCESS:
        case FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


