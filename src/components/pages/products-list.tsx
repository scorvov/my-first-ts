import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IProduct} from "../../store/models/iProduct";
import {IProductsFetchingState} from "../../store/reducers/dataFetchReducer";
import {productDelete} from "../../store/actions/productActions";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import "../../assests/list.scss"
import {IFetchingState} from "../../store/reducers/fetchingReducer";

export interface IProductList {
    productList: IProduct[];
    productDelete: (id:number) => void;
}

export const ProductsList: React.FC<IProductList> = ({ productList, productDelete }) => {
    const renderRow = ((product: IProduct) => {
        const {id, name, cost, dateUp } = product;
        return (
            <tr key={id}>
                <td> </td>
                <td><Link to={`/product/${id}`}
                          className="link">{name}</Link></td>
                <td>{cost} $</td>
                <td>{dateUp}</td>
                <td >
                    <Link to={`/product/update/${id}`}
                          className="link">Ред</Link>
                    <button
                        onClick={() => productDelete(id)}
                        className="link">
                        Удалить
                    </button>
                </td>
            </tr>
        )
    });
    return (
        <div className="list">
            <Link to="/product/create"
                  className="btn btn-warning btn-sm" >
                Добавить товар
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Перечень товаров</th>
                    <th>Стоимость</th>
                    <th>Дата изменения</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                { productList.map(renderRow) }
                </tbody>
            </table>
        </div>
    );
};

export class ProductsListContainer extends React.Component<any> {

    render() {
        const {productList, loading, error, productDelete} = this.props;
        if (loading) {
            return <Spinner />
        }
        if(error) {
            return <ErrorIndicator />
        }
        return <ProductsList productList={productList}
                             productDelete={productDelete}
        />
    }
}
export interface IMapState {
    dataState:IProductsFetchingState;
    fetchState: IFetchingState;
}
interface IStateProps {
    productList: IProduct[];
    loading: boolean;
    error: any;
}
const mapStateToProps = ({dataState,fetchState}:IMapState):IStateProps => {
    const {productList} = dataState;
    const {loading, error} = fetchState;
    return {productList, loading, error}
};

export default connect(mapStateToProps, {productDelete})(ProductsListContainer);

