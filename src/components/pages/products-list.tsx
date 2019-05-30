import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IProduct} from "../../store/models/iProduct";
import {IProductsFetchingState} from "../../store/reducers/productsFetchReducer";
import {withCarstoreService} from "../hoc";
import {
    productsRequested,
    productsLoaded,
    productsError,
    ILoadedProductsAction,
    productDeleted
} from "../../store/actions/fetchProducts";
import {compose} from "../../utils/compose";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import "../../assests/list.scss"
import {Dispatch} from "redux";

export interface IProductList {
    productList: IProduct[];
    productDeleted: (id:number) => void;
}

export const ProductsList: React.FC<IProductList> = ({ productList, productDeleted }) => {
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
                          onClick={() => productDeleted(id)}
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
    componentWillMount() {
        if(!this.props.productList.length) {
            this.props.fetchProducts();
        }
    }

    render() {
        const {productList, loading, error, productDeleted} = this.props;
        if (loading) {
            return <Spinner />
        }
        if(error) {
            return <ErrorIndicator />
        }
        return <ProductsList productList={productList}
                             productDeleted={productDeleted}
                             // productSelected={productSelected}
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
const mapDispatchToProps = (dispatch:Dispatch, ownProps: any) => {
    const {carstoreService} = ownProps;
    return {
        productDeleted: (id:number) => dispatch(productDeleted(id)),
        // productSelected: (id:number) => dispatch(productSelected(id)),
        fetchProducts: () => {
            dispatch(productsRequested());
            carstoreService.getProducts()
                .then((data: IProduct[]):ILoadedProductsAction => dispatch(productsLoaded(data)))
                .catch((err:string) => dispatch(productsError(err)));
        }
    }
};

export default compose(
    withCarstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductsListContainer);

// export default withCarstoreService()(
//     connect(mapStateToProps, mapDispatchToProps)(ProductsList));
