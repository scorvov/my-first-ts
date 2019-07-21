import {SET_USER_DATA} from "store/constants";

export interface IAuthState {
    isAuth: boolean;
}

let initialState = {
    isAuth: false
};

export const authReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: action.payload
            };

        default:
            return state;
    }
};
