import {combineReducers} from "redux";
import {dataReducer} from "./data-reducer";
import {fetchingReducer} from "./fetching-reducer";
import {authReducer} from "./auth-reducer";
import {toastReducer} from "./toast-reducer";


export const rootReducer = combineReducers({
    dataState: dataReducer,
    fetchState: fetchingReducer,
    authState: authReducer,
    toastState: toastReducer
});
