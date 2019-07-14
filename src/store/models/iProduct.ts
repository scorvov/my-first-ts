export interface IProduct {
    id: number;
    name: string;
    cost: number;
    img: string;
    info: string;
    dateUp: Date;
    productProps: {
        id: number;
        name: string;
        type: string;
        value: string;
    }[];
}

export interface IProductsList {
    productsList: {
        products: IProduct[];
        perPage: number;
        currentPage: number;
        order: string;
        orderBy: string;
    };
}
