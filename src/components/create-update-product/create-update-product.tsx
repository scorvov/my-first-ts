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
    fetchDataForUpdate: (id?:number) => void;
    itemCreate: (typeData: string, params: any) => void;
    productUpdate: (params: any) => void;
}

type TProps = TUpdateProductStateProps & IUpdateProductDispatchProps & FormikProps<IProduct> & TRoute;

export class CreateUpdateProduct extends React.Component<TProps> {

    componentDidMount(): void {
        this.getSelectProduct();
    }

    getSelectProduct = () => {
        this.props.match.params.id ?
            this.props.fetchDataForUpdate(+this.props.match.params.id):
            this.props.fetchDataForUpdate();
    };
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

    selectAction = () => {
        return (!this.props.match.params.id) ? this.props.itemCreate : this.props.productUpdate;
    };

    render() {
        const {loading, error, selectProduct} = this.props;
        if (loading) return <Spinner/>;
        if (error) return <ErrorIndicator/>;
        if (selectProduct) return <EnhancedCreateUpdateProductView selectProduct={selectProduct}
                                                                   propsList={this.props.propsList}
                                                                   history={this.props.history}
                                                                   productAction={this.selectAction()}
                                                                   rewriteProductProps={this.rewriteProductProps}/>;
        else return <Spinner/>;
    }
}
