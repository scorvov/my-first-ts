import * as React from "react";
import {IProductsList} from "../../store/models/iProduct";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ProductsListView} from "./products-list-view";

export interface IProductDelete {
    productDelete: (id: number, fetchParams: any) => void;
}
export interface IFetchData {
    fetchData: (params:any, fetchParams?: any) => void;
}

export class ProductsList extends React.Component<IProductsList & IProductDelete & IFetchData & IFetchingState> {

    componentDidMount(): void {
        const {perPage, currentPage} = this.props.productsList;
        this.props.fetchData('products', {perPage, currentPage} );
    }

    handleChangePage = (event: any, currentPage: any) => {
        this.props.fetchData('products', {perPage: this.props.productsList.perPage, currentPage});
    };

    handleChangePerPage = (event: any) => {
        this.props.fetchData('products', {perPage: parseInt(event.target.value, 10), currentPage: 0});
    };

    render() {
        const {productsList, loading, error, productDelete} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductsListView productsList={productsList}
                                 handleChangePage={this.handleChangePage}
                                 handleChangePerPage={this.handleChangePerPage}
                                 productDelete={productDelete}
        />
    }
}
