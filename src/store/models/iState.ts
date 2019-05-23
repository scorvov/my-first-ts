import {IProduct} from "./iProduct";
import {IProp} from "./iProp";

export interface IState {
    productList: IProduct[];
    propsList: IProp[];
    loading: boolean;
    error: string | null;
}
