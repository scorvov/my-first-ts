import {combineReducers} from "redux";
import {dataReducer} from "./dataReducer";
import {fetchingReducer} from "./fetchingReducer";


export const rootReducer = combineReducers({
    dataState: dataReducer,
    fetchState: fetchingReducer
});
