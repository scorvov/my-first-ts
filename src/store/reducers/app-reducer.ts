import {INITIALIZED_SUCCESS} from "store/constants";

export interface IAppState {
    initialized: boolean;
}

let initialState = {
    initialized: false
};

export const appReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};