import * as React from "react";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ProductsListView} from "./products-list-view";
import {Order} from "../common/table/table-head-enhanced";
import {TProductListStateProps, IProductListStateProps} from "./container";
import {IFetchingState} from "store/reducers/fetching-reducer";

export interface IProductListDispatchProps {
    productDelete: (id:number, fetchParams: any) => void;
    fetchData: (params:any, fetchParams?: any) => void;
}

export class ProductsList extends React.Component<TProductListStateProps & IProductListDispatchProps> {

    componentDidMount(): void {
        const {perPage, currentPage, order, orderBy} = this.props.productsList;
        this.props.fetchData('products', {perPage, currentPage, order, orderBy} );
    }

    componentDidUpdate(prevProps: Readonly<IFetchingState & IProductListStateProps & IProductListDispatchProps>, prevState: Readonly<{}>, snapshot?: any): void {

    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => {
        const {perPage, order, orderBy} = this.props.productsList;
        this.props.fetchData('products', {perPage, currentPage, order, orderBy});
    };

    handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {order, orderBy} = this.props.productsList;
        this.props.fetchData('products', {perPage: parseInt(event.target.value, 10), currentPage: 0, order, orderBy});
    };

    handleChangeSort = (order:Order, orderBy:string) => {
        const {perPage, currentPage} = this.props.productsList;
        this.props.fetchData('products', {perPage, currentPage, order, orderBy });
    };

    onDelete = (id: number) => {
        const {perPage, currentPage, order, orderBy, products, count} = this.props.productsList;
        this.props.productDelete(id, {perPage,
            currentPage: products.length === 1 && count !== 1 ? currentPage - 1 : currentPage,
            order, orderBy});
    };

    render() {
        const {productsList, loading, error} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductsListView productsList={productsList}
                                 handleChangePage={this.handleChangePage}
                                 handleChangePerPage={this.handleChangePerPage}
                                 handleChangeSort={this.handleChangeSort}
                                 onDelete={this.onDelete}
        />
    }
}
