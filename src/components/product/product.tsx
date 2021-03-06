import * as React from "react";
import {Spinner, ErrorIndicator} from "../common";
import {ProductView} from "./product-view";
import {RouteComponentProps} from "react-router";
import {TProductStateProps} from "./container";

interface PathParamsType {
    id: string;
}
export type TRoute = RouteComponentProps<PathParamsType>;

interface IProductDispatchProps {
    fetchProductById: (id: number) => void;
    resetSelectProduct: () => void;
}

type TProductProps = TProductStateProps & IProductDispatchProps & TRoute;

export class Product extends React.Component<TProductProps> {
    componentDidMount(): void {
        this.props.resetSelectProduct();
        const {id} = this.props.match.params;
        this.props.fetchProductById(+id);
    }

    render() {
        const {loading, error, selectProduct} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <ProductView selectProduct={selectProduct}/>;
    }
}
