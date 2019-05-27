import {combineReducers} from "redux";
import {productsFetchReducer} from "./productsFetchReducer";
import {propsFetchReducer} from "./propsFetchReducer";


export const rootReducer = combineReducers({
    productsState: productsFetchReducer,
    propsState: propsFetchReducer
});
