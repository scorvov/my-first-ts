import * as React from "react";
import {IProductsList} from "../../store/models/iProduct";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ProductsListView} from "./products-list-view";

export interface IDispatchProps {
    productDelete: (id: number) => void;
}

export class ProductsList extends React.Component<IProductsList & IDispatchProps & IFetchingState> {

    render() {
        const {productsList, loading, error, productDelete} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductsListView productsList={productsList}
                                 productDelete={productDelete}
        />
    }
}
