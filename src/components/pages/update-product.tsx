import * as React from "react";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import "../../assests/create-product.scss";
import {Input} from "../common/input/input";
import {FieldArray, Form, FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {productCreate} from "../../store/actions/productActions";
import {IProp, IPropsList} from "../../store/models/iProp";
import {Select} from "../common/select/select";
import {ISelectProductProps} from "./product";
import {IMapState} from "../../store/models/iState";
import {fetchProductById} from "../../store/actions/fetchingActions";
import {Spinner} from "../common/spinner";
import {ErrorIndicator} from "../common/error-indicator";
import {IFetchingState} from "../../store/reducers/fetchingReducer";
import {ICreateProductValues} from "./create-product";

export class UpdateProductContainer extends React.Component<any> {

    componentDidMount(): void {
        if(this.props.match.params.id) {
            const {id} = this.props.match.params;
            this.props.fetchProductById(+id);
        }
    }
    handlingError = (errors:any) => {
        if ((errors.cost) && errors.cost.includes("cost must")) {
            errors.cost = "Стоимость должна состоять из цифр"
        }
    };

    rewriteProductProps = (propsList:IProp[], productProps:IProp[]) => {
        // запись id и type объекта property в массив productProps по name из propsList
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
        if (loading) return <Spinner />;
        if(error) return <ErrorIndicator />;
        return <EnhancedUpdateProductView propsList={this.props.propsList}
                                          selectProduct={this.props.selectProduct}
                                          productCreate={this.props.productCreate}
                                          handlingError={this.handlingError}
                                          rewriteProductProps={this.rewriteProductProps} />;
    }
}

const UpdateProductView:React.FC<any&FormikProps<ICreateProductValues>> = (props) => {
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
                    {productProps && productProps.length > 0 ?
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
                                </span>)))
                        : null}
                </>
            )}/>
        </div>
    </Form>)
};

const EnhancedUpdateProductView = withFormik({
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
    mapPropsToValues: ({ selectProduct }: any) => {
        return selectProduct;
    },
    handleSubmit: (values: any, {props: {productCreate}, resetForm, setSubmitting}) => {
        productCreate(values);
        resetForm();
        setSubmitting(false);
    }
})(UpdateProductView);

const mapStateToProps = ({dataState, fetchState}: IMapState): IPropsList & ISelectProductProps & IFetchingState => {
    const {selectProduct, propsList} = dataState;
    const {loading, error} = fetchState;
    return {selectProduct, propsList, loading, error};
};
export const UpdateProduct = connect(mapStateToProps,
    {productCreate, fetchProductById})(UpdateProductContainer);

