import {connect} from "react-redux";
import { IProductsList} from "../../store/models/iProduct";
import {productDelete} from "../../store/actions/productActions";
import "../../assests/styles/list.scss"
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {IMapState} from "../../store/models/iState";
import {ProductsList} from "./products-list";
import {fetchData} from "../../store/actions/fetchingActions";

export interface IProductListStateProps {
    productsList:IProductsList;
}
export type TProductListStateProps = IFetchingState & IProductListStateProps

const mapStateToProps = ({dataState, fetchState}: IMapState): TProductListStateProps => {
    const {productsList} = dataState;
    const {loading, error} = fetchState;
    return {productsList, loading, error}
};

export const ProductsListContainer = connect(mapStateToProps,
    {productDelete, fetchData})(ProductsList);

