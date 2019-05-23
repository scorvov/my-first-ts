import { createStore } from "redux";
import {productsFetchReducer} from './reducers/productsFetchReducer';

export const store = createStore(productsFetchReducer);



