import * as React from "react";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ProductView} from "./product-view";
import {RouteComponentProps} from "react-router";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {ISelectProductProps} from "./container";

interface PathParamsType {id: string;}

interface DispatchProps {fetchProductById: (id:number) => void; resetSelectProduct: () => void;}
type TRoute = RouteComponentProps<PathParamsType>;
type TProductProps = ISelectProductProps&IFetchingState&TRoute;

export class Product extends React.Component<TProductProps&DispatchProps> {
    componentDidMount(): void {
        this.props.resetSelectProduct();
        const {id} = this.props.match.params;
        this.props.fetchProductById(+id);
    }

    render() {
        const {selectProduct, loading, error} = this.props;
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <ProductView selectProduct={selectProduct} />;
    }
}
