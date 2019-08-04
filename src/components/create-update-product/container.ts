import {connect} from "react-redux";
import {itemCreate, productUpdate, fetchDataForUpdate} from "../../store/actions/data-actions";
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetching-reducer";
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
    {fetchDataForUpdate, itemCreate, productUpdate})(withRouteRedirect(CreateUpdateProduct));
