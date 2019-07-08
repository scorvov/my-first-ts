import {FormikHandlers, FormikProps, FormikValues} from "formik";
import {IProduct} from "../../store/models/iProduct";
import * as React from "react";
import {IProp, IPropsList} from "../../store/models/iProp";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {EnhancedCreateUpdateProductView} from "./with-formik-product";

type TProps = FormikProps<IProduct>;

export class CreateUpdateProduct extends React.Component<any & FormikHandlers & FormikValues, IPropsList, TProps> {

    componentDidMount(): void {
        this.props.match.params.id ? this.props.fetchProductById(+this.props.match.params.id) && this.props.fetchData('props'):
        this.props.fetchData('props');
    }
    componentWillUnmount(): void {
        this.props.resetSelectProduct();
    }

    handlingError = (errors: any) => {
        //изменение текста ошибки библиотеки Yup
        if ((errors.cost) && errors.cost.includes("cost must")) {
            errors.cost = "Стоимость должна состоять из цифр"
        }
    };
    rewriteProductProps = (propsList: IProp[], productProps: IProp[]) => {
        // запись id и type объекта property в массив свойств продукта из propsList
        if (productProps.length !== 0) {
            productProps = productProps.map((propProduct: IProp) => {
                let prop = propsList.find((item: IProp) => item.name === propProduct.name);
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
                                                handlingError={this.handlingError}
                                                rewriteProductProps={this.rewriteProductProps}/>;
    }
}
