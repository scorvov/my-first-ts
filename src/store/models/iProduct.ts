import {IProp} from "./iProp";

export interface IProduct {
    id: number;
    name: string;
    cost: number;
    img: string;
    info: string;
    dateUp: string;
    props?: IProp[] | [];
}

