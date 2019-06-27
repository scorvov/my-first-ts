import {IProp} from "./iProp";

export interface IProduct {
    id: number;
    name: string;
    cost: string;
    img: string;
    info: string;
    dateUp: string;
    productProps: IProp[] | [];
}

export interface IProductsList {
    productsList: IProduct[];
}
