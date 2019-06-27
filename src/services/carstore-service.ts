import {IProduct} from "../store/models/iProduct";
import {IProp} from "../store/models/iProp";
import {ICreateProductValues} from "../components/pages/create-product";
import {ICreatePropValues} from "../components/pages/create-prop";

export interface IData {
    productsList: IProduct[];
    propsList: IProp[];
}

export type TData = IProduct[] | IProp[];

//уточнить по поводу типа объекта, возвращаемого Error
export interface ICarstoreService {
    data: IData;

    _getData(data: TData): TData | Object;

    _getProducts: () => Promise<Object>;
    _getProps: () => Promise<Object>;
    // getData: () => IData;
}

class CarstoreService implements ICarstoreService {
    data = {
        productsList: [
            {
                id: 1,
                name: 'Mersedes S550 4matic',
                cost: '118 000',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg/1200px-Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg',
                info: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий.',
                dateUp: '20.05.2019',
                productProps: [{id: 1, name: 'Цвет авто', type: 'dropdown', value: 'синий'},
                    {id: 2, name: 'Год выпуска', type: 'string', value: '2017'},
                    {id: 3, name: 'Тип топлива', type: 'string', value: 'бензин'}]
            },
            {
                id: 2,
                name: 'Mersedes S550 4matic',
                cost: '55 000',
                img: 'https://img.drivemag.net/jato_car_photos/MERCEDES%2FS-CLASS%2Fsedan%2F4%2F2009%2Fexterior-photos%2Fo%2Fmercedes-s-class-sedan-4-doors-2009-model-exterior-photos-0.jpg',
                info: '',
                dateUp: '20.05.2019',
                productProps: [{id: 1, name: 'Цвет авто', type: 'dropdown', value: 'синий'},
                    {id: 2, name: 'Год выпуска', type: 'string', value: '2017'},
                    {id: 3, name: 'Тип топлива', type: 'string', value: 'бензин'}]
            },
        ],
        propsList: [
            {
                id: 1,
                name: 'Цвет авто',
                type: 'dropdown'
            },
            {
                id: 2,
                name: 'Год выпуска',
                type: 'number'
            },
            {
                id: 3,
                name: 'Тип топлива',
                type: 'string'
            }
        ]
    };

    _getData = (data: TData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 100);
        })
    };
    _getProducts = async () => {
        // @ts-ignore
        /*return data.map(({id, name, cost, dateUp}: IProduct) => {
            return {id, name, cost, dateUp};
        });*/
        return await this._getData(this.data.productsList);

    };
    _getProps = async () => await this._getData(this.data.propsList);

    getData = async () => {
        return {
            productsList: await this._getProducts(),
            propsList: await this._getProps()
        };
    };
    getProductById = async (id: number) => {
        const product = this.data.productsList.find((product: IProduct) => id === product.id);
        if (product) return product;
    };

    deleteProp = async (id: number) => {
        this.data.propsList = this.data.propsList.filter((item) => item.id !== id);
        return {ok: true};
    };
    createProp = async (paramsForCreateProp: ICreatePropValues) => {
        const maxId = Math.max.apply(Math, this.data.propsList.map(item => item.id));
        const newItem = {id: maxId + 1, ...paramsForCreateProp};
        this.data.propsList.push(newItem);
        return {ok: true}
    };
    deleteProduct = async (id: number) => {
        this.data.productsList = this.data.productsList.filter((item) => item.id !== id);
        return {ok: true};
    };
    createProduct = async (paramsForCreateProduct: ICreateProductValues) => {
        const maxId = Math.max.apply(Math, this.data.productsList.map(item => item.id));
        const newItem: IProduct = {
            id: maxId + 1,
            cost: ((+paramsForCreateProduct.cost.replace(/\s/g, ''))).toLocaleString(),
            ...paramsForCreateProduct
        };
        // @ts-ignore
        this.data.productsList.push(newItem);
        return {ok: true}
    };

}

export {CarstoreService};
