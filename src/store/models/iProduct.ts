export interface IProduct {
    id: number;
    name: string;
    cost: string;
    img: string;
    info: string;
    dateUp: string;
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
    };
}
