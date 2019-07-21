import "../../assests/styles/prop-create.scss";
import "../../assests/styles/create-product.scss";
import {connect} from "react-redux";
import {productCreate, resetSelectProduct, productUpdate} from "../../store/actions/productActions";
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetching-reducer";
import {fetchData, fetchProductById} from "../../store/actions/fetchingActions";
import {CreateUpdateProduct} from "./create-update-product";
import {IPropsListStateProps} from "../props-list/container";
import {ISelectProduct} from "../product/container";
import {withRouteRedirect} from "../../hoc/withAuthRedirect";

export type TUpdateProductStateProps = IPropsListStateProps & ISelectProduct & IFetchingState;

const mapStateToProps = ({dataState, fetchState}: IMapState):TUpdateProductStateProps => {
    const {selectProduct, propsList} = dataState;
    const {loading, error} = fetchState;
    return {selectProduct, propsList, loading, error};
};
export const CreateUpdateProductContainer = connect(mapStateToProps,
    {fetchData, productCreate, productUpdate,
        fetchProductById, resetSelectProduct})(withRouteRedirect(CreateUpdateProduct));
