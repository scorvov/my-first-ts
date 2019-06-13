import {IProp} from "../models/iProp";
import {
    FETCH_PROPS_FAILURE,
    FETCH_PROPS_REQUEST,
    FETCH_PROPS_SUCCESS,
    ILoadedPropsAction, PROP_CREATED,
    PROP_DELETED
} from "../actions/fetchProps";

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
        case PROP_CREATED:
            const maxId = Math.max.apply(Math, state.propsList.map(item => item.id));
            const newItem = {id: maxId+1, name: action.payload.name, type: action.payload.type};
            return {
                ...state,
                propsList: [...state.propsList, newItem]
            };
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


