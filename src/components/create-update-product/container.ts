import "../../assests/styles/prop-create.scss";
import "../../assests/styles/create-product.scss";
import {connect} from "react-redux";
import {productCreate, resetSelectProduct, productUpdate} from "../../store/actions/productActions";
import {IPropsList} from "../../store/models/iProp";
import {IMapState} from "../../store/models/iState";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {fetchProductById} from "../../store/actions/fetchingActions";
import {CreateUpdateProduct} from "./create-update-product";
import {ISelectProductProps} from "../product/container";

const mapStateToProps = ({dataState, fetchState}: IMapState): IPropsList & ISelectProductProps & IFetchingState => {
    const {selectProduct, propsList} = dataState;
    const {loading, error} = fetchState;
    return {selectProduct, propsList, loading, error};
};
export const CreateUpdateProductContainer = connect(mapStateToProps,
    {productCreate, productUpdate, fetchProductById, resetSelectProduct})(CreateUpdateProduct);
