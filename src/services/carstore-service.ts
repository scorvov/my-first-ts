import {IProduct} from "../store/models/iProduct";
import {IProp} from "../store/models/iProp";

export interface IData {
    products: IProduct[];
    props: IProp[];
}

export type TData = IProduct[] | IProp[];

//уточнить по поводу типа объекта, возвращаемого Error
export interface ICarstoreService {
    data: IData;

    _getData(data: TData): TData | Object;

    getProducts(): Object;

    getProps(): Object;
}

class CarstoreService implements ICarstoreService {
    data = {
        products: [
            {
                id: 1,
                name: 'Mersedes S550 4matic',
                cost: 118000,
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg/1200px-Mercedes-Benz_S_500_%28W_222%29_%E2%80%93_Frontansicht%2C_6._April_2014%2C_Neuss.jpg',
                info: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий.',
                dateUp: '18/05/2019',
                props: [{id: 1, name: 'Цвет авто', type: 'dropdown', value: 'синий'},
                    {id: 2, name: 'Год выпуска', type: 'string', value: 2017},
                    {id: 3, name: 'Тип топлива', type: 'string', value: 'бензин'}]
            },
            {
                id: 2,
                name: 'Mersedes S550 4matic',
                cost: 55000,
                img: 'https://img.drivemag.net/jato_car_photos/MERCEDES%2FS-CLASS%2Fsedan%2F4%2F2009%2Fexterior-photos%2Fo%2Fmercedes-s-class-sedan-4-doors-2009-model-exterior-photos-0.jpg',
                info: '',
                dateUp: '18/05/2019',
                props: [{id: 1, name: 'Цвет авто', type: 'dropdown', value: 'синий'},
                    {id: 2, name: 'Год выпуска', type: 'string', value: 2017},
                    {id: 3, name: 'Тип топлива', type: 'string', value: 'бензин'}]
            },
        ],
        props: [
            {
                id: 1,
                name: 'Цвет авто',
                type: 'dropdown',
                value: 'синий'
            },
            {
                id: 2,
                name: 'Год выпуска',
                type: 'number',
                value: 1995
            },
            {
                id: 3,
                name: 'Тип топлива',
                type: 'string',
                value: 'бензин'
            }
        ]
    };

    _getData = (data: TData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.85) {
                    reject(new Error('Something bad happend'));
                }
                else {
                    resolve(data);
                }
            }, 100);
        })
    };
    getProducts = async () => await this._getData(this.data.products);
    getProps = async () => await this._getData(this.data.props);
}

export {
    CarstoreService
}
