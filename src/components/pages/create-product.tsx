import * as React from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import "../pages/create-product.scss";
import {Input} from "../common/input/input";
import {FieldArray, Form, FormikProps, withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {productCreated} from "../../store/actions/fetchProducts";
import {ILogin} from "./main-page";
import {IPropsFetchingState} from "../../store/reducers/propsFetchReducer";
import {IProp} from "../../store/models/iProp";
import {Select} from "../common/select/select";


type ProductProps = IProp[] | [];

export interface ICreateProductValues {
    name: string;
    cost: string;
    img: string;
    info: string;
    dateUp: string;
    productProps?: ProductProps;
}

export class CreateProductView extends React.Component<ILogin & any & IPropsFetchingState & FormikProps<ICreateProductValues>> {

    componentDidUpdate(): void {
        this.rewriteProductProps();
        this.handlingError();
    }
    handlingError = () => {
        const {errors} = this.props;
        if ((errors.cost) && errors.cost.includes("cost must")) {
            errors.cost = "Стоимость должна состоять из цифр"
        }
    };
    rewriteProductProps = () => {
        const {propsList} = this.props;
        let {productProps} = this.props.values;
        // запись id и type объекта property в массив productProps по name из propsList
        if (productProps.length !== 0) {
            this.props.values.productProps = productProps.map((propProduct: IProp) => {
                let prop = propsList.find((item: IProp) => item.name === propProduct.name);
                return {...propProduct, ...prop};
            });
        }
    };

    render() {
        const {isLoggedIn, touched, errors, isSubmitting, propsList} = this.props;
        let {productProps} = this.props.values;

        if(!isLoggedIn) return <Redirect to="/login"/>;
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
                                })}>Add</button>
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
                                            (<option value={index} label={productProps[index].name} />)
                                            : (<option value={-1} label={"Select"} />)}
                                        {propsList.map((option: any) =>
                                            (!productProps.find((item:any) => item.name === option.name) ?
                                                <option key={option.id} value={option.name} label={option.name} />
                                                : null))}
                                    </Select>
                                    <Input
                                        label={"Значение"}
                                        placeholder={"Введите значение свойства"}
                                        name={`productProps[${index}].value`}
                                        // error={errors.productProps ? errors.productProps[index].value : null}
                                        // touched={touched.productProps ? touched.productProps[index].value : null}
                                    />
                                        {/*{(productProps[index].type === "dropdown") ?
                                            (<button type="button" onClick={() => arrayHelpers.insert(index, '')}>
                                                +
                                            </button>) : null
                                        }*/}
                                </span>)))
                            : null}
                        </>
                    )}/>
                </div>
            </Form>)
    }
}

const formikEnhancer = withFormik({
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
    mapPropsToValues: ({name, cost, img, info, productProps}: any) => {
        return {
            name: name || '',
            cost: cost || '',
            img: img || '',
            info: info || '',
            productProps: productProps || [],
            dateUp: new Date().toLocaleDateString()
        }
    },
    handleSubmit: (values: any, {props: {productCreated}, resetForm, setSubmitting}) => {
        productCreated(values);
        resetForm();
        setSubmitting(false);
    }
})(CreateProductView);

const mapStateToProps = ({propsState}: any): IPropsFetchingState => {
    const {propsList} = propsState;
    return {propsList}
};
export const CreateProduct = connect(mapStateToProps, {productCreated})(formikEnhancer);

