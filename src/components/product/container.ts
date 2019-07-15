import {connect} from "react-redux";
import {fetchProductById} from "../../store/actions/fetchingActions";
import {resetSelectProduct} from "../../store/actions/productActions";
import {Product} from "./product";
import {IProduct} from "../../store/models/iProduct";
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetchingReducer";

export interface ISelectProduct {
    selectProduct:IProduct;
}
export type TProductStateProps = ISelectProduct & IFetchingState

const mapStateToProps = ({dataState, fetchState}:IMapState):TProductStateProps => {
    const {selectProduct} = dataState;
    const {error, loading} = fetchState;
    return {selectProduct, error, loading};
};

export const ProductContainer = connect(mapStateToProps,
    {fetchProductById, resetSelectProduct})(Product);


