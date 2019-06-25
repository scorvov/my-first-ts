import {IProp} from "../models/iProp";
import {
    FETCH_PROPS_FAILURE,
    FETCH_PROPS_REQUEST,
    FETCH_PROPS_SUCCESS,
    ILoadedPropsAction} from "../actions/fetchProps";

export interface IPropsFetchingState {
    propsList: IProp[];
    loading?: boolean;
    error?: any;
}

const initialPropsState: IPropsFetchingState = {
    propsList: [],
    loading: false,
    error: null
};
type TPropAction = ILoadedPropsAction;

export const propsFetchReducer = (state: IPropsFetchingState = initialPropsState, action:TPropAction) => {
    switch (action.type) {
        case FETCH_PROPS_REQUEST:
            return {
                ...state,
                propsList: [],
                loading: true,
                error: null
            };
        case FETCH_PROPS_SUCCESS:
            return {
                ...state,
                propsList: action.payload,
                loading: false,
                error: null
            };
        case FETCH_PROPS_FAILURE:
            return {
                ...state,
                propsList: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


