import {IProduct} from "./iProduct";
import {IProp} from "./iProp";

export interface IProductsState {
    productList: IProduct[];
    loading: boolean;
    error: string | null;
}

export interface IPropsState {
    propsList: IProp[];
    loading: boolean;
    error: string | null;
}

export interface IState {
    productsState: IProductsState;
    propsState: IPropsState;
}
