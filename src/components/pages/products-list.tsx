import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {IState} from "../../store/models/iState";
import {IProduct} from "../../store/models/iProduct";
import {IFetchingState} from "../../store/reducers";

const ProductsList: React.FC<IFetchingState> = (props) => {
    const {productList}:IFetchingState = props;
    return (
        <>
            <Link to="/product/create">Добавить товар</Link>
            <div>TableListProducts</div>
            <ul>
                {
                    productList.map((product:IProduct) => {
                        return (
                            <li key={product.id}><ProductListItem product={product} /></li>
                        )
                    })
                }
            </ul>
        </>
    );
};
export interface Props {
    product: IProduct
}
export const ProductListItem: React.FC<Props> = ({product}) => {
    const {name, cost, dateUp} = product;
    return (
        <>
            <span>{name} - {cost} - {dateUp}</span>
        </>
    );
};
const mapStateToProps = (state:IState) => {
    return state
};

export default connect(mapStateToProps)(ProductsList);
