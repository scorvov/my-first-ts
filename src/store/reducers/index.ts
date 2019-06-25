import {combineReducers} from "redux";
import {dataFetchReducer} from "./dataFetchReducer";
import {fetchingReducer} from "./fetchingReducer";


export const rootReducer = combineReducers({
    dataState: dataFetchReducer,
    fetchState: fetchingReducer
});
