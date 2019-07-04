import {connect} from "react-redux";
import { IProductsList} from "../../store/models/iProduct";
import {productDelete} from "../../store/actions/productActions";
import "../../assests/styles/list.scss"
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {IMapState} from "../../store/models/iState";
import {ProductsList} from "./products-list";

const mapStateToProps = ({dataState, fetchState}: IMapState): IProductsList & IFetchingState => {
    const {productsList} = dataState;
    const {loading, error} = fetchState;
    return {productsList, loading, error}
};

export const ProductsListContainer = connect(mapStateToProps, {productDelete})(ProductsList);

