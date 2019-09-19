import {Order} from "../../components/common/table/table-head-enhanced";
import {IProp} from "./iProp";

export interface IProduct {
    id: number;
    name: string;
    cost: number;
    img: string;
    info: string;
    dateUp: Date;
    productProps: IProp[];
}

export interface IProductsList {
    items: IProduct[];
    count: number;
    perPage: number;
    currentPage: number;
    order: Order;
    orderBy: string;
}
