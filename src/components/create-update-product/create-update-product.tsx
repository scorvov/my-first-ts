import {FormikProps} from "formik";
import {IProduct} from "../../store/models/iProduct";
import * as React from "react";
import {IProp} from "../../store/models/iProp";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {EnhancedCreateUpdateProductView} from "./with-formik-product";
import {TUpdateProductStateProps} from "./container";
import {TRoute} from "../product/product";

interface IUpdateProductDispatchProps {
    fetchData: (params:any, fetchParams?: any) => void;
    productCreate: (params: any) => void;
    productUpdate: (params: any) => void;
    fetchProductById: (id:number) => void;
    resetSelectProduct: () => void;
}

type TProps = TUpdateProductStateProps & IUpdateProductDispatchProps & FormikProps<IProduct> & TRoute;

export class CreateUpdateProduct extends React.Component<TProps> {

    componentDidMount(): void {
        this.props.resetSelectProduct();
        this.props.match.params.id ?
            // @ts-ignore
            this.props.fetchProductById(+this.props.match.params.id) && this.props.fetchData('props')
            : this.props.fetchData('props', {perPage: 100, currentPage: 0});
    }

    rewriteProductProps = (props: IProp[], productProps: IProp[]) => {
        // запись id и type объекта property в массив свойств продукта из propsList
        if (productProps.length !== 0) {
            productProps = productProps.map((propProduct: IProp) => {
                let prop = props.find((item: IProp) => item.name === propProduct.name);
                return {...propProduct, ...prop};
            });
        }
        return productProps;
    };

    selectProductAction = () => {
        return (!this.props.match.params.id) ? this.props.productCreate : this.props.productUpdate;
    };

    render() {
        const {loading, error} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        return <EnhancedCreateUpdateProductView propsList={this.props.propsList}
                                                selectProduct={this.props.selectProduct}
                                                history={this.props.history}
                                                productAction={this.selectProductAction()}
                                                rewriteProductProps={this.rewriteProductProps}/>;
    }
}
