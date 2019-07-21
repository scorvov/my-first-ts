import * as React from "react";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import "../../assests/styles/list.scss"
import {PropsListView} from "./props-list-view";
import {Order} from "../common/table/table-head-enhanced";
import {TPropsListStateProps} from "./container";

export interface IPropsListDispatchProps {
    propDelete: (id: number, fetchParams: any) => void;
    fetchData: (params:any, fetchParams?: any) => void;
}

export class PropsList extends React.Component<TPropsListStateProps & IPropsListDispatchProps> {

    componentDidMount(): void {
        const {perPage, currentPage, order, orderBy} = this.props.propsList;
        this.props.fetchData('props', {perPage, currentPage, order, orderBy});
    }

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, currentPage: number) => {
        const {perPage, order, orderBy} = this.props.propsList;
        this.props.fetchData('props', {perPage, currentPage, order, orderBy});
    };

    handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {order, orderBy} = this.props.propsList;
        this.props.fetchData('props', {perPage: parseInt(event.target.value, 10), currentPage: 0, order, orderBy});
    };

    handleChangeSort = (order: Order, orderBy: string) => {
        const {perPage, currentPage} = this.props.propsList;
        this.props.fetchData('props', {perPage, currentPage, order, orderBy})
    };

    onDelete = (id: number) => {
        const {perPage, currentPage, order, orderBy, props, count} = this.props.propsList;
        this.props.propDelete(id, {perPage,
            currentPage: props.length === 1 && count !== 1 ? currentPage - 1 : currentPage,
            order, orderBy
        })
    };

    render() {
        const {propsList, loading, error} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <PropsListView
            onDelete={this.onDelete}
            handleChangePage={this.handleChangePage}
            handleChangePerPage={this.handleChangePerPage}
            handleChangeSort={this.handleChangeSort}
            propsList={propsList}/>
    }
}



