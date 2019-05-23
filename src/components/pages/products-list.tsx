import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IProduct} from "../../store/models/iProduct";
import {IFetchingState} from "../../store/reducers/productsFetchReducer";
import {withCarstoreService} from "../hoc";
import {productsRequested, productsLoaded, productsError, IProductsLoaded} from "../../store/actions";
import {compose} from "../../utils/compose";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import "./product-list.scss"

export interface IProductList {
    productList: IProduct[]
}
export const ProductsList: React.FC<IProductList> = ({productList}) => {
    const renderRow = ((product: IProduct) => {
        const {id, name, cost, dateUp } = product;
        return (
            <tr key={id}>
                <td>#</td>
                <td>{name}</td>
                <td>{cost}</td>
                <td>${dateUp}</td>
                <td >
                    <Link to="/product/create" className="link">Ред</Link>
                    <Link to="/products" className="link">
                        Удалить
                    </Link>
                </td>
            </tr>
        )
    });
    return (
        <div className="products-list">
            <button className="add-product btn btn-warning btn-sm">
                <Link to="/product/create" className="link" >Добавить товар</Link>
            </button>
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
export interface IProductProps {
    product: IProduct
}
export const ProductListItem: React.FC<IProductProps> = ({product}) => {
    const {name, cost, dateUp} = product;
    return (
        <>
            <span>{name} - {cost} - {dateUp}</span>
        </>
    );
};
export class ProductsListContainer extends React.Component<any> {
    componentDidMount() {
       this.props.fetchProducts();
    }
    render() {
        const {productList, loading, error} = this.props;
        if (loading) {
            return <Spinner />
        }
        if(error) {
            return <ErrorIndicator />
        }
        return <ProductsList productList={productList}/>
    }
}
const mapStateToProps = ({productList, loading, error}:IFetchingState) => {

    return {productList, loading, error}
};

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
    const {carstoreService} = ownProps;
    return {
        fetchProducts: () => {
            dispatch(productsRequested());
            carstoreService.getCars()
                .then((data: IProduct[]):IProductsLoaded => dispatch(productsLoaded(data)))
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
