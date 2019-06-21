import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IProduct} from "../../store/models/iProduct";
import {IProductsFetchingState} from "../../store/reducers/productsFetchReducer";
import {productDelete} from "../../store/actions/fetchProducts";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import "../../assests/list.scss"

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
                          // onClick = {() => productSelected(id)} вторая вариация: запись в state и адресация одновременно
                          className="link">{name}</Link></td>
                <td>{cost} $</td>
                <td>{dateUp}</td>
                <td >
                    <Link to="/products" className="link">Ред</Link>
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
    productsState:IProductsFetchingState;
}
const mapStateToProps = ({productsState}:IMapState):IProductsFetchingState => {
    const {productList, loading, error} = productsState;
    return {productList, loading, error}
};

export default connect(mapStateToProps, {productDelete})(ProductsListContainer);

