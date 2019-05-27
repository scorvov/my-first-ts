import {applyMiddleware, createStore} from "redux";
// import {productsFetchReducer} from './reducers/productsFetchReducer';
import {rootReducer} from "./reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));




