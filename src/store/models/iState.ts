import {IProduct} from "./iProduct";

export interface IProductsState {
    productList: IProduct[];
    loading: boolean;
    error: string | null;
}
