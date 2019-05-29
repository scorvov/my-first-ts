import {IProp} from "../models/iProp";
import {
    FETCH_PROPS_FAILURE,
    FETCH_PROPS_REQUEST,
    FETCH_PROPS_SUCCESS,
    IPropsLoaded,
    PROP_DELETED
} from "../actions/fetchProps";

export interface IPropsFetchingState {
    propsList: IProp[];
    loading: boolean;
    error: any;
}

const initialPropsState: IPropsFetchingState = {
    propsList: [],
    loading: false,
    error: null
};
type TPropAction = IPropsLoaded;

export const propsFetchReducer = (state: IPropsFetchingState = initialPropsState, action:TPropAction) => {
    switch (action.type) {
        case PROP_DELETED:
            return {
                ...state,
                propsList: state.propsList.filter((item) => item.id !== action.payload)
            };
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


