import * as React from "react";
import {Link} from "react-router-dom";
import "../../assests/styles/prop-create.scss";
import "../../assests/styles/create-product.scss";
import {Input} from "../common/input/input";
import {FieldArray, Form, FormikHandlers, FormikProps, FormikValues, withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {productCreate, resetSelectProduct, productUpdate} from "../../store/actions/productActions";
import {IProp, IPropsList} from "../../store/models/iProp";
import {Select} from "../common/select/select";
import {IMapState} from "../../store/models/iState";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {ISelectProductProps} from "./product";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {fetchProductById} from "../../store/actions/fetchingActions";
import {IProduct} from "../../store/models/iProduct";

interface IProductCreate {
    productCreate: (values: IProduct) => void;
}

type TProps = FormikProps<IProduct>;

class CreateUpdateProductContainer extends React.Component<any & FormikHandlers & FormikValues, IPropsList, TProps> {

    componentDidMount(): void {
        //проверка на создание нового или редактирование продукта по id
        if (this.props.match.params.id) {
            const {id} = this.props.match.params;
            this.props.fetchProductById(+id);
        }
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
    selectProductAction = () => {
        return (!this.props.match.params.id) ? this.props.productCreate : this.props.productUpdate;
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

const CreateUpdateProductView: React.FC<any & FormikProps<IProduct>> = (props) => {
    const {touched, errors, isSubmitting, handlingError, rewriteProductProps, propsList} = props;
    const {productProps} = props.values;
    handlingError(errors);
    props.values.productProps = rewriteProductProps(propsList, productProps);

    return (<Form className="create-prop">
        <div className="group-buttons">
            <Link to="/products"
                  className="btn btn-danger btn-sm">
                Вернуться
            </Link>
            <button
                type={"submit"}
                disabled={isSubmitting}
                className="btn btn-success btn-sm">
                Сохранить
            </button>
        </div>
        <hr className="line"/>
        <h4>Добавление товара</h4>
        <hr className="line"/>
        <div className={"input-form"}>
            <Input
                label={"Название товара"}
                placeholder={"Mersedes S550 4matic"}
                name="name"
                error={errors.name}
                touched={touched.name}
            />
            <Input
                label={"Стоимость товара"}
                placeholder={"113 000"}
                name="cost"
                error={errors.cost}
                touched={touched.cost}
            />
            <Input
                label={"Изображение"}
                placeholder={"image"}
                name="img"
                error={errors.img}
                touched={touched.img}
            />
            <Input
                component="textarea"
                cols="80"
                rows="5"
                label={"Описание"}
                placeholder={"info"}
                name="info"
                error={errors.info}
                touched={touched.info}
            />
            <h5>Добавление товару свойств</h5>
            <br/>
            <FieldArray name={"productProps"} render={arrayHelpers => (
                <>
                    <button
                        type={"button"}
                        onClick={() => arrayHelpers.push({
                            id: Math.floor(Math.random() * 1000),
                            name: '',
                            type: '',
                            value: ''
                        })}>Add
                    </button>
                    {productProps && productProps.length > 0 &&
                    (productProps.map((productProp: IProp, index: number) => (
                        <span key={index} className={"add-props-product"}>
                                    <button type={"button"}
                                            onClick={() => arrayHelpers.remove(index)}>–
                                    </button>
                                    <Select
                                        name={`productProps[${index}].name`}
                                        component="select"
                                        label={"Свойство"}
                                    >
                                        {(productProps[index].name) ?
                                            (<option value={index} label={productProps[index].name}/>)
                                            : (<option value={-1} label={"Select"}/>)}
                                        {propsList.map((option: any) =>
                                            (!productProps.find((item: any) => item.name === option.name) ?
                                                <option key={option.id} value={option.name} label={option.name}/>
                                                : null))}
                                    </Select>
                                    <Input
                                        label={"Значение"}
                                        placeholder={"Введите значение свойства"}
                                        name={`productProps[${index}].value`}
                                        error={errors.productProps && errors.productProps[index] ? errors.productProps[index].value : null}
                                        touched={touched.productProps && touched.productProps[index] ? touched.productProps[index].value : null}
                                    />
                                </span>)))}
                </>
            )}/>
        </div>
    </Form>)
};

const EnhancedCreateUpdateProductView = withFormik<any & IProduct & IProductCreate, IProduct>({
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Название свойство должно быть не менее 2 символов")
            .max(30, "Слишком длинное название")
            .required("Требуется ввести название"),
        cost: Yup.number()
            .min(1000, "Стоимость должна быть не менее 1 000 $")
            .max(1000000, "Стоимость не должна превышать 1 000 000 $")
            .integer("Стоимость должна быть целым числом")
            .required("Требуется ввести стоимость"),
        img: Yup.string()
            .min(2, "Ссылка файла изображения должна быть не менее 2 символов")
            .required("Требуется указать ссылку файла"),
        info: Yup.string()
            .max(1000, "Описание не должно превышать 1000 символов"),
        productProps: Yup.array().of(
            Yup.object().shape({
                value: Yup.string()
                    .required("Требуется ввести свойство"),
                name: Yup.string()
                    .required("Требуется ввести имя")
            }))
    }),
    mapPropsToValues: ({selectProduct}) => {
        return selectProduct;
    },
    handleSubmit: (values, {props: {productAction, history}, resetForm, setSubmitting}) => {
        productAction(values);
        resetForm();
        setSubmitting(false);
        history.push('/products');
    }
})(CreateUpdateProductView);

const mapStateToProps = ({dataState, fetchState}: IMapState): IPropsList & ISelectProductProps & IFetchingState => {
    const {selectProduct, propsList} = dataState;
    const {loading, error} = fetchState;
    return {selectProduct, propsList, loading, error};
};
export const CreateUpdateProduct = connect(mapStateToProps,
    {productCreate, productUpdate, fetchProductById, resetSelectProduct})(CreateUpdateProductContainer);
