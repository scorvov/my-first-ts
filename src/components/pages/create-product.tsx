import * as React from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import "../../assests/prop-create.scss";
import "../pages/create-product.scss";
import {Input} from "../common/input/input";
import {Form, FormikProps, withFormik} from "formik";
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
        const {propsList} = this.props;
        let {productProps} = this.props.values;
        // запись id и type объекта property в массив productProps по name из propsList
        if (productProps.length !== 0) {
            this.props.values.productProps = productProps.map((propProduct: IProp) => {
                let prop = propsList.find((item: IProp) => item.name === propProduct.name);
                return {...propProduct, ...prop};
            });
        }
    }

    handlingError = () => {
        const {errors} = this.props;
        if ((errors.cost) && errors.cost.includes("cost must")) {
            errors.cost = "Стоимость должна состоять из цифр"
        }
    };

    render() {
        const {handlingError} = this;
        const {isLoggedIn, touched, errors, isSubmitting} = this.props;
        const {productProps, onDecrease, onIncrease} = this.props.values;
        handlingError();
        console.log(this.props.values.productProps);

        if (!isLoggedIn) return <Redirect to="/login"/>;
        const productPropsShow = ((productProp: IProp, index: number) => {
            // console.log(this.props.values.propsOptions);
            const {propsList} = this.props;
            const optionRow = (option: IProp) => {
                return (
                    <option key={option.id} value={option.name} label={option.name}/>
                )
            };
            return (<span key={index} className={"add-props-product"}>
            <button type={"submit"} onClick={() => onDecrease(index)}>–</button>
                <Select
                    name={`productProps[${index}].name`}
                    component="select"
                    label={"Свойство"}
                >
                    <option value={0} label={"select"}/>
                    {propsList.map(optionRow)}
                </Select>
                <Input
                    label={"Значение"}
                    placeholder={"Введите значение свойства"}
                    name={`productProps[${index}].value`}
                    // error={errors.productProps ? errors.productProps[index].value : null}
                    // touched={touched.productProps ? touched.productProps[index].value : null}
                />
            </span>)
        });
        return (
            <Form className="create-prop" >
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
                    <div>
                        <h5>Добавление товару свойств</h5>
                        <input type="submit" onClick={onIncrease} value={"Add"}/>
                        <br/>
                        {productProps.map(productPropsShow)}
                    </div>
                </div>
            </Form>
        );
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
    mapPropsToValues: ({name, cost, img, info, productProps = [], propsOptions, propsList}: any) => {
        if (!propsOptions) {
            propsOptions = propsList.map((item: any) => {
                return {...item, selected: false};
            })
        }
        const onDecrease = (index: number) => {
            productProps.splice(index, 1);
        };
        const onIncrease = () => {
            productProps.push({id: Math.floor(Math.random() * 1000), name: '', type: '', value: ''});
        };
        return {
            name: name || '',
            cost: cost || '',
            img: img || '',
            info: info || '',
            productProps: productProps || [],
            propsOptions: propsOptions,
            onDecrease: onDecrease,
            onIncrease: onIncrease,
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

