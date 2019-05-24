import {applyMiddleware, createStore} from "redux";
// import {productsFetchReducer} from './reducers/productsFetchReducer';
import {reducers} from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(reducers,applyMiddleware(thunk));



