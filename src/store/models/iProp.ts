import {Order} from "../../components/common/table/table-head-enhanced";

export interface IProp {
    id: number;
    name: string;
    type: string;
    value?: string;
}

export interface IPropsList {
    items: IProp[];
    count: number;
    perPage: number;
    currentPage: number;
    order: Order;
    orderBy: string;
}
