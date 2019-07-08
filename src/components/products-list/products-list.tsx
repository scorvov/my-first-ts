import * as React from "react";
import {IProductsList} from "../../store/models/iProduct";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ProductsListView} from "./products-list-view";

export interface IProductDelete {
    productDelete: (id: number) => void;
}
export interface IFetchData {
    fetchData: (params:any) => void;
}

export class ProductsList extends React.Component<IProductsList & IProductDelete & IFetchData & IFetchingState> {

    componentDidMount(): void {
        this.props.fetchData('products');
    }

    render() {
        const {productsList, loading, error, productDelete} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductsListView productsList={productsList}
                                 productDelete={productDelete}
        />
    }
}
