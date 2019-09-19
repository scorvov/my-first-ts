import * as React from "react";
import {ProductsListView} from "./products-list-view";
import {Order} from "../common/table-head-enhanced";
import {TProductListStateProps} from "./container";
import {ErrorIndicator} from "../common";

export interface IProductListDispatchProps {
    itemDeleteById: (id:number, typeData: string, fetchParams: any) => void;
    fetchData: (params:any, fetchParams?: any) => void;
}

export class ProductsList extends React.Component<TProductListStateProps & IProductListDispatchProps> {

    componentDidMount(): void {
        const {perPage, currentPage, order, orderBy} = this.props.productsList;
        this.props.fetchData('products', {perPage, currentPage, order, orderBy} );
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
        const {perPage, currentPage, order, orderBy, items, count} = this.props.productsList;
        this.props.itemDeleteById(id, 'products', {perPage,
            currentPage: items.length === 1 && count !== 1 ? currentPage - 1 : currentPage,
            order, orderBy});
    };

    render() {
        const {productsList, error} = this.props;
        // if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductsListView productsList={productsList}
                                 handleChangePage={this.handleChangePage}
                                 handleChangePerPage={this.handleChangePerPage}
                                 handleChangeSort={this.handleChangeSort}
                                 onDelete={this.onDelete}
        />
    }
}
