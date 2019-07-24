import {connect} from "react-redux";
import {fetchProductById} from "../../store/actions/fetching-actions";
import {resetSelectProduct} from "../../store/actions/data-actions";
import {Product} from "./product";
import {IProduct} from "../../store/models/iProduct";
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetching-reducer";
import {withRouteRedirect} from "../../hoc/withAuthRedirect";

export interface ISelectProduct {
    selectProduct?:IProduct;
}
export type TProductStateProps = ISelectProduct & IFetchingState

const mapStateToProps = ({dataState, fetchState}:IMapState):TProductStateProps => {
    const {selectProduct} = dataState;
    const {error, loading} = fetchState;
    return {selectProduct, error, loading};
};

export const ProductContainer = connect(mapStateToProps,
    {fetchProductById, resetSelectProduct})(withRouteRedirect(Product));


